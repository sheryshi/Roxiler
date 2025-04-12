
const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  // In a real app, validate credentials against the database
  const { email, password } = req.body;
  
  // For demo purposes, accept any credentials
  res.json({
    success: true,
    token: 'fake-jwt-token',
    user: {
      name: 'User',
      email,
      role: 'normal'
    }
  });
});

// Register route
router.post('/register', (req, res) => {
  // In a real app, save user to database
  const { name, email, password, role, address } = req.body;
  
  res.json({
    success: true,
    message: 'User registered successfully',
    user: {
      name,
      email,
      role
    }
  });
});

module.exports = router;
