const Listing = require('../models/ListingModel.js');

async function getAllListings(req, res) {
    try {
        const listings = await Listing.findAll(); // Fetch all listings from the database
        res.json(listings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching listings' });
    }
}

async function addListing(req, res) {
    try {
        const { username, url, bookGenre, bookTitle, price, author } = req.body;
        const newListing = await Listing.create({ username, url, bookGenre, bookTitle, price, author });
        res.status(201).json(newListing);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating listing' });
    }
}

async function getListingByUsername(req, res) {
    const { username } = req.query;  // Get the username from the query parameters

    // Check if username is provided
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        // Find all listings associated with the provided username
        const listings = await Listing.findAll({
            where: { username },  // Match listings by the provided username
        });

        // If no listings are found, return an error
        if (listings.length === 0) {
            return res.status(404).json({ message: 'No listings found for this user' });
        }

        // Return the found listings
        return res.status(200).json(listings);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unable to retrieve listings' });
    }
}

module.exports = { getAllListings, addListing, getListingByUsername }