const express = require('express');
const { getAllUsers, addUser, findLikedBooks, getUserByUsername } = require('../controllers/UserController'); // Import controller functions

const router = express.Router(); // Initialize router

// Define route to fetch all users
router.get('/get-all', getAllUsers);

// Define route to create a new user
router.post('/add', addUser);

router.get('/find-liked-books', findLikedBooks);

router.get('/get-one', getUserByUsername);

module.exports = router; // Export router to be used in server.js
