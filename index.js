const express = require("express");
const router = require("./routes/product.js");
const sequelize = require("./config/db.js");

const app = express();

app.use(express.json());

app.use("/api/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(`Database connection established successfully`);
  } catch (err) {
    console.log(
      `There was an error connecting to the database -------- ${err.message}`,
    );
  }
  console.log(`Server is running on port ${PORT}`);
});

// Cehaguy was here
