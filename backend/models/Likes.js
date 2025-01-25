const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager');
const User = require('./user');
const Post = require('./post');

const Likes = sequelize.define('Likes', {
    postID: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: Post,
            key: 'postID',
        },
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
            model: User,
            key: 'username',
        },
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