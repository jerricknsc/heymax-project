const { DataTypes } = require('sequelize');
const sequelize = require('./ConnectionManager');
const User = require('./UserModel');

const Post = sequelize.define('Post', {
    postID: {
        type: DataTypes.STRING(255),
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    review: {
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
}, {
    tableName: 'Post',
    timestamps: false,
});

// Define foreign key relationship
Post.belongsTo(User, {
    foreignKey: 'username',
    onDelete: 'CASCADE',
});

module.exports = Post;
