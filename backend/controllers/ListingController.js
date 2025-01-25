const Listing = require('../models/ListingModel.js');

async function getAllListings(req, res){
    try {
        const listings = await Listing.findAll(); // Fetch all listings from the database
        res.json(listings);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching listings' });
    }
}

module.exports = {getAllListings}