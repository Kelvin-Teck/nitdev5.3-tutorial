const express = require("express");

const router = express.Router();
const User = require("../models/user");

// Never send password hashes back to the client
const withoutPassword = (user) => {
  const safeUser = user.toJSON();
  delete safeUser.password;
  return safeUser;
};

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.json({ message: "users retrieved successfully", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error retrieving users: " + error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = await User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
    });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "The user found successfully", foundUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error retrieving user: " + error.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const newUser = req.body;

    const user = await User.create(newUser);

    return res.status(201).json({
      message: "User created successfully",
      user: withoutPassword(user),
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "A user with that email already exists" });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.errors.map((e) => e.message).join(", "),
      });
    }

    console.error("Error creating user:", error);

    return res.status(500).json({
      message: "Unable to create user",
      error: error.message,
    });
  }
});

module.exports = router;
