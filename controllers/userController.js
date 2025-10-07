const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @desc    Create a new user
// @route   POST /api/v1/user/signup
// @access  Public
const signup = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: false, 
        message: errors.array()[0].msg 
      });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        status: false, 
        message: 'User already exists with this email or username' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error creating user' 
    });
  }
};

// @desc    User login
// @route   POST /api/v1/user/login
// @access  Public
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: false, 
        message: errors.array()[0].msg 
      });
    }

    const { email, username, password } = req.body;

    // Check if either email or username is provided
    if (!email && !username) {
      return res.status(400).json({ 
        status: false, 
        message: 'Please provide email or username' 
      });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: email || '' },
        { username: username || '' }
      ]
    });

    if (!user) {
      return res.status(400).json({ 
        status: false, 
        message: 'Invalid Username and password' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ 
        status: false, 
        message: 'Invalid Username and password' 
      });
    }

    // Generate JWT token (optional but recommended)
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      jwt_token: token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error during login' 
    });
  }
};

module.exports = {
  signup,
  login
};
