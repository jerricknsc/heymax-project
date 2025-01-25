const express = require('express');
const { getBookInfo } = require('../controllers/OpenaiController');

const router = express.Router(); // Initialize router

// Define route to fetch all users
router.post('/get-image-info', getBookInfo);

module.exports = router; // Export router to be used in server.js