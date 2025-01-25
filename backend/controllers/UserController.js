// controllers/userController.js
const User = require('../models/UserModel.js'); // Import the User model
const Likes = require('../models/LikesModel.js');
const Post = require('../models/PostModel.js');

// Function to fetch all users
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        console.log('helo')
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}

// Function to create a new user
async function addUser(req, res) {
    try {
        const { username, points } = req.body;
        const newUser = await User.create({ username, points }); // Create a new user
        res.status(201).json(newUser); // Return the newly created user
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

async function findLikedBooks(req, res) {
    try {
        const { username } = req.query; // Get username from request parameters

        // Query to get bookGenre and bookTitle of liked posts
        const likedBooks = await Likes.findAll({
            where: { username }, // Filter by the username
            include: {
                model: Post, // Join with the Post model
                attributes: ['bookGenre', 'bookTitle'], // Select only the relevant columns
            }
        });

        // Clean the response to return { bookGenre: [], bookTitle: [] }
        const response = {
            bookGenre: likedBooks.map(like => like.Post.bookGenre), // Extract book genres
            bookTitle: likedBooks.map(like => like.Post.bookTitle), // Extract book titles
        };

        // Return the result
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching liked books' });
    }
}

async function getUserByUsername(req, res) {
    const { username } = req.query;  // Get the username from the URL parameters

    console.log(username)

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username }});

        // If the user is not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user data (excluding password, etc., for security)
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unable to get user' });
    }
}

module.exports = { getAllUsers, addUser, findLikedBooks, getUserByUsername }; // Export controller functions
