const Likes = require('../models/LikesModel.js');

async function addLikedPost(req, res){
    const { postID, username } = req.body;
    
        try {
            // Insert a new like into the likes table
            const newLike = await Likes.create({
                postID: postID,
                username: username,
            });
    
            // Send success response
            res.status(200).json({ message: 'Like added successfully', data: newLike });
        }
        catch (error) {
            // Handle errors (e.g., if something went wrong with the database)
            console.error(error);
            res.status(500).json({ message: 'Error adding like to post' });
        }
}

module.exports = {addLikedPost}