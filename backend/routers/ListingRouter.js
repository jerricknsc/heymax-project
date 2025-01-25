const express = require('express');
const { getAllListings } = require('../controllers/ListingController');

const router = express.Router(); // Initialize router

// Define route to fetch all users
router.get('/get-all', getAllListings);

module.exports = router; // Export router to be used in server.js