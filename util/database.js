const Sequelize = require('sequelize');

// create the connection to database
const sequelize = new Sequelize(
  process.env.DB_NAME_SQLIZE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST
  });

module.exports = sequelize;