const express = require('express');
const { getAllListings, addListing, getListingByUsername } = require('../controllers/ListingController');

const router = express.Router(); // Initialize router

// Define route to fetch all users
router.get('/get-all', getAllListings);

router.post('/add', addListing);

router.get('/get-by-username', getListingByUsername);

module.exports = router; // Export router to be used in server.js