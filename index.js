require("dotenv").config();
const express = require("express");
const router = require("./routes/product.js");

const { Sequelize } = require("sequelize");

const app = express();

app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

app.use("/api/abc", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");
  } catch (err) {
    console.log(
      `There was an error connecting to the database ----- ${err.message}`,
    );
  }
  console.log(`Server is running on port ${PORT}`);
});

// Cehaguy was here
