const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/jerseys', (req, res) => {
  db.all('SELECT * FROM jerseys', (err, jerseys) => {
    if (err) return res.status(500).send(err);
    res.send(jerseys);
  });
});

router.post('/jerseys', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  db.run('INSERT INTO jerseys (name, description, price, imageUrl) VALUES (?, ?, ?, ?)', [name, description, price, imageUrl], function(err) {
    if (err) return res.status(500).send(err);
    res.send({ id: this.lastID });
  });
});

module.exports = router;
