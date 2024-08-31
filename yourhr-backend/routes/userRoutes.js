const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { signupUser } = require('../controllers/userController'); 


// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single('resume');

// Define routes
router.post('/signup', upload, signupUser);

module.exports = router;
