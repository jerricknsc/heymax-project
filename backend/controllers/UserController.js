// controllers/userController.js
const User = require('../models/UserModel.js'); // Import the User model

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

module.exports = { getAllUsers, addUser }; // Export controller functions
