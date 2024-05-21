// Importing necessary modules
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route for user login
router.post('/login', (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;
  // Querying the database to find a user with the provided username and password
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    // If an error occurs, send a 500 status with the error message
    if (err) return res.status(500).send(err);
    // If no user is found, send a 401 status with an error message
    if (!user) return res.status(401).send('Invalid credentials');
    // If the user is found, send the user object
    res.send(user);
  });
});

// Route for user registration
router.post('/register', (req, res) => {
  // Extracting username and password from the request body
  const { username, password } = req.body;
  // Inserting a new user into the database with the provided username and password
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
    // If an error occurs, send a 500 status with the error message
    if (err) return res.status(500).send(err);
    // If the user is successfully registered, send the user ID
    res.send({ id: this.lastID });
  });
});

// Exporting the router to be used in other modules
module.exports = router;
