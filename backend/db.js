// Require the sqlite3 module and initialize it with verbose mode
const sqlite3 = require('sqlite3').verbose();
// Create a new in-memory SQLite database
const db = new sqlite3.Database(':memory:');

// Serialize database operations to prevent concurrent access
db.serialize(() => {
  // Create the 'users' table with columns for id, username, and password
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    }
  });

  // Create the 'jerseys' table with columns for id, name, description, price, and imageUrl
  db.run(`CREATE TABLE jerseys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    imageUrl TEXT NOT NULL
  )`, (err) => {
    if (err) {
      console.error("Error creating jerseys table:", err);
    }
  });

  // Insert sample jersey data into the 'jerseys' table
  const jerseys = [
    { name: "Steph Curry Jersey", description: "Authentic Steph Curry jersey.", price: 100, imageUrl: "images/curry.jpg" },
    { name: "Klay Thompson Jersey", description: "Authentic Klay Thompson jersey.", price: 100, imageUrl: "images/klay.jpg" },
    { name: "Draymond Green Jersey", description: "Authentic Draymond Green jersey.", price: 100, imageUrl: "images/draymond.jpg" },
    { name: "Andrew Wiggins Jersey", description: "Authentic Andrew Wiggins jersey.", price: 100, imageUrl: "images/wiggins.jpg" },
    { name: "James Wiseman Jersey", description: "Authentic James Wiseman jersey.", price: 100, imageUrl: "images/wiseman.jpg" },
    { name: "Jordan Poole Jersey", description: "Authentic Jordan Poole jersey.", price: 100, imageUrl: "images/poole.jpg" },
    { name: "Warriors Hoodie", description: "Official Warriors hoodie.", price: 50, imageUrl: "images/hoodie.jpg" },
    { name: "Warriors Hat", description: "Official Warriors hat.", price: 25, imageUrl: "images/hat.jpg" },
    { name: "Warriors T-Shirt", description: "Official Warriors T-shirt.", price: 20, imageUrl: "images/tshirt.jpg" },
    { name: "Warriors Keychain", description: "Official Warriors keychain.", price: 10, imageUrl: "images/keychain.jpg" },
  ];

  // Iterate over the jerseys array and insert each jersey into the 'jerseys' table
  jerseys.forEach(jersey => {
    db.run(`INSERT INTO jerseys (name, description, price, imageUrl) VALUES (?, ?, ?, ?)`,
      [jersey.name, jersey.description, jersey.price, jersey.imageUrl], (err) => {
        if (err) {
          console.error("Error inserting jersey:", err);
        }
    });
  });
});

// Export the database connection for use in other modules
module.exports = db;
