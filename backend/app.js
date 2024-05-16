const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const userRoutes = require('./routes/userRoutes');
const jerseyRoutes = require('./routes/jerseyRoutes');

app.use('/api/users', userRoutes);
app.use('/api/jerseys', jerseyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
