const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('mydb', 'root', 'root', {
    host: 'localhost',   
    dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Define a model (e.g., User)
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
});

// Export the sequelize instance and models
module.exports = { sequelize, User };
