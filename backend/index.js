// server.js
const express = require('express');
const sequelize = require('./models/ConnectionManager'); // Import the Sequelize instance to sync
const userRoutes = require('./routers/UserRouter'); // Import the user routes

const app = express();
const port = 8000;

app.use(express.json()); // Middleware to parse JSON bodies

// Use the user routes
app.use('/users', userRoutes); // Prefix routes with /api

// Sync database
sequelize.sync({ force: false }) // Set to true if you want to drop and recreate tables
  .then(() => {
    console.log('Database synchronized');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
