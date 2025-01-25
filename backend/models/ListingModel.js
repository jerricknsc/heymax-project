const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager');
const User = require('./user');

const Listing = sequelize.define('Listing', {
    listingID: {
        type: DataTypes.STRING(255),
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    bookGenre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    bookTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Listing',
    timestamps: false,
});

// Define foreign key relationship
Listing.belongsTo(User, {
    foreignKey: 'username',
    onDelete: 'CASCADE',
});

module.exports = Listing;
