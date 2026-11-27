const express = require("express");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const sequelize = require("./config/db.js");

const app = express();

app.use(express.json());

app.use("/api/", productRouter);
app.use("/api/", userRouter);

app.listen(5000, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Database connection established successfully`);
  } catch (err) {
    console.log(
      `There was an error connecting to the database -------- ${err.message}`,
    );
  }
  console.log(`Server is running on port 5000`);
});

// Cehaguy was here
