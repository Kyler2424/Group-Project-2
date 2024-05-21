// Importing necessary modules
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get all jerseys from the database
router.get('/jerseys', (req, res) => {
  // Query the database to get all jerseys
  db.all('SELECT * FROM jerseys', (err, jerseys) => {
    // If there is an error, send a 500 status with the error message
    if (err) return res.status(500).send(err);
    // Otherwise, send the jerseys as a response
    res.send(jerseys);
  });
});

// Route to add a new jersey to the database
router.post('/jerseys', (req, res) => {
  // Extract the jersey details from the request body
  const { name, description, price, imageUrl } = req.body;
  // Insert the new jersey into the database
  db.run('INSERT INTO jerseys (name, description, price, imageUrl) VALUES (?, ?, ?, ?)', [name, description, price, imageUrl], function(err) {
    // If there is an error, send a 500 status with the error message
    if (err) return res.status(500).send(err);
    // Otherwise, send the ID of the newly created jersey as a response
    res.send({ id: this.lastID });
  });
});

// Export the router to be used in the application
module.exports = router;
