const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const db = require('./config/mongoose.js');
const User = require('./models/User.js');
const userRoutes = require('./routes/userRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

// Start the server after connecting to MongoDB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
