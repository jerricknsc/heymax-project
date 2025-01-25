const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager');
const User = require('./UserModel');
const Post = require('./PostModel');

const Likes = sequelize.define('Likes', {
    postID: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: Post,
            key: 'postID',
        },
        primaryKey: true,  // Mark postID as part of the composite primary key
        autoIncrement: false,  // Disable auto-increment (if any)
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: User,
            key: 'username',
        },
        primaryKey: true,  // Mark username as part of the composite primary key
        autoIncrement: false,  // Disable auto-increment (if any)
    },
}, {
    tableName: 'Likes',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['username', 'postID'], // Composite primary key
        },
    ],
});

// Define foreign key relationships
Likes.belongsTo(User, {
    foreignKey: 'username',
    onDelete: 'CASCADE',
});

Likes.belongsTo(Post, {
    foreignKey: 'postID',
    onDelete: 'CASCADE',
});

module.exports = Likes;