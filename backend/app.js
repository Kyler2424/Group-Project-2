// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

// Initializing Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route to serve index.html
app.get('/', (req, res) => {
  // Sending the index.html file to the client
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Importing user routes
const userRoutes = require('./routes/userRoutes');
// Importing jersey routes
const jerseyRoutes = require('./routes/jerseyRoutes');

// Mounting user routes at /api/users
app.use('/api/users', userRoutes);
// Mounting jersey routes at /api/jerseys
app.use('/api/jerseys', jerseyRoutes);

// Setting the port for the server, defaulting to 3000 if not specified
const PORT = process.env.PORT || 3000;
// Starting the server and listening on the specified port
app.listen(PORT, () => {
  // Logging a message to the console indicating the server is running
  console.log(`Server is running on port ${PORT}`);
});
