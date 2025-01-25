const express = require('express');
const { sequelize, User } = require('./models/ConnectionManager'); // Import sequelize and models

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON body

// Route to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from DB
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Route to create a new user
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email }); // Insert new user into DB
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Sync the models (syncs the DB and tables with Sequelize)
sequelize.sync({ force: false }) // set to true if you want to drop & recreate tables on each start
    .then(() => {
        console.log('Database synchronized');
    });
