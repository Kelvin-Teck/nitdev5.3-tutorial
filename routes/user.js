const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require("../models/user.js");

router.post("/auth/register", async (req, res) => {
  try {
    const { userName, fullName, email, password, phoneNumber } = req.body;

    if (!userName || !fullName || !email || !password || !phoneNumber) {
      return res.status(404).json({ message: "please enter all field" });
    }

    if (password.length < 8) {
      return res
        .status(403)
        .json({ message: "password must be at least 8 characters" });
    }

    const isexistUserByEmail = await User.findOne({ where: { email } });

    if (isexistUserByEmail) {
      return res
        .status(403)
        .json({ message: "A user with this email already exists" });
    }

    const isexistUserByUserName = await User.findOne({ where: { userName } });

    if (isexistUserByUserName) {
      return res
        .status(403)
        .json({ message: "A user with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      userName,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    };
    await User.create(newUser);

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: `There was an error whne trying to create a user: ${error.message}`,
      });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { userName, password:plainTextPassword } = req.body;

    if (!userName || !plainTextPassword) {
      return res.status(404).json({ message: "please enter all field" });
    }

    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
      }
      
      const passwordCheck = await bcrypt.compare(plainTextPassword, user.password)

      
      if (!passwordCheck) {
      return res.status(403).json({ message: "Invalid credentials" });
          
      }


      const token = jwt.sign({ id: user.id, email: user.email }, "jwt-secret", { expiresIn: '5m' });

      const {password, ...sanitizedUser } = user.dataValues  
      return res.status(200).json({message: "user logged in successfully", sanitizedUser, token})
   
  } catch (error) {
      return res
        .status(500)
        .json({ message: `log in failed ${error.message}` });
      
  }
});

module.exports = router;
