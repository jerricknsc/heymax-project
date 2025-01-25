// models/connectionManager.js
const { Sequelize } = require('sequelize');

// Create Sequelize instance and connect to MySQL
const sequelize = new Sequelize('heymax', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize; // Export sequelize instance for other files
