// controllers/userController.js
const Post = require('../models/PostModel.js');

// Function to fetch all users
async function getAllPosts(req, res) {
    try {
        const posts = await Post.findAll(); // Fetch all posts from the database
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

module.exports = { getAllPosts }; 