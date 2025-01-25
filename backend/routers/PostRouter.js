const express = require('express');
const { getAllPosts } = require('../controllers/PostController');

const router = express.Router(); // Initialize router

// Define route to fetch all users
router.get('/get-all', getAllPosts);

module.exports = router; // Export router to be used in server.js
