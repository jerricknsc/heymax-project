const express = require('express');
const { addLikedPost } = require('../controllers/LikesController');

const router = express.Router(); // Initialize router

// Define route to fetch all users
router.post('/add', addLikedPost);

module.exports = router; // Export router to be used in server.js
