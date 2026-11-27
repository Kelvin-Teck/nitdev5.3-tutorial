const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nitdev-5.3", "postgres", "1234567890", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});

module.exports = sequelize;
