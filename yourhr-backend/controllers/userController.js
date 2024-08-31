const User = require('../models/User'); // Import the User model

// Controller for handling user signup
const signupUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Check if resume file is present
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const user = new User({
      name,
      email,
      phone,
      resume: req.file.path,
    });
    
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'This email address is already registered.' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

module.exports = {
  signupUser,
};
