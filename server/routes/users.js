
const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // In a real app, fetch from database
  res.json({
    success: true,
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Oak St', role: 'normal' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', address: '789 Pine St', role: 'store' }
    ]
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // In a real app, fetch from database
  res.json({
    success: true,
    user: {
      id: parseInt(id),
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      role: 'normal'
    }
  });
});

// Create user
router.post('/', (req, res) => {
  const { name, email, password, role, address } = req.body;
  
  // In a real app, save to database
  res.json({
    success: true,
    message: 'User created successfully',
    user: {
      id: 4,
      name,
      email,
      role,
      address
    }
  });
});

// Update user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, address } = req.body;
  
  // In a real app, update in database
  res.json({
    success: true,
    message: 'User updated successfully',
    user: {
      id: parseInt(id),
      name,
      email,
      role,
      address
    }
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // In a real app, delete from database
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router;
