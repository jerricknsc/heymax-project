const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager'); // Import sequelize instance

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(255),
        primaryKey: true,
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: 'User', // Matches SQL table name
    timestamps: false, // Disables `createdAt` and `updatedAt` fields
});

module.exports = User;
