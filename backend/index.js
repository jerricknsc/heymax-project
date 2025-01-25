// server.js
const express = require('express');
const sequelize = require('./models/ConnectionManager'); // Import the Sequelize instance to sync
const userRoutes = require('./routers/UserRouter'); // Import the user routes
const postRoutes = require('./routers/PostRouter'); // Import the user routes
const likeRoutes = require('./routers/LikesRouter'); // Import the user routes
const listingRoutes = require('./routers/ListingRouter'); // Import the user routes
const openaiRoutes = require('./routers/OpenaiRouter'); // Import the user routes


const app = express();
const cors = require("cors")
app.use(cors())
const port = 8000;

app.use(express.json()); // Middleware to parse JSON bodies

// Use the user routes
app.use('/users', userRoutes); 
app.use('/posts', postRoutes);
app.use('/likes', likeRoutes);
app.use('/listings', listingRoutes);
app.use('/openai', openaiRoutes);

// Sync database
sequelize.sync({ force: false }) // Set to true if you want to drop and recreate tables
  .then(() => {
    console.log('Database synchronized');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
