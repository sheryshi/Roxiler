
const express = require('express');
const router = express.Router();

// Get all stores
router.get('/', (req, res) => {
  // In a real app, fetch from database
  res.json({
    success: true,
    stores: [
      { 
        id: 1, 
        name: 'Coffee Haven', 
        email: 'info@coffeehaven.com', 
        address: '123 Main St, New York',
        description: 'A cozy coffee shop with a wide variety of specialty coffees and pastries.',
        rating: 4.5,
        image: '/placeholder.svg' 
      },
      { 
        id: 2, 
        name: 'Tech Galaxy', 
        email: 'support@techgalaxy.com', 
        address: '456 Broadway, San Francisco',
        description: 'The latest in technology gadgets and accessories.',
        rating: 3.8,
        image: '/placeholder.svg' 
      },
      { 
        id: 3, 
        name: 'Fashion World', 
        email: 'contact@fashionworld.com', 
        address: '789 Fashion Ave, Los Angeles',
        description: 'Trendy clothing and accessories for all seasons.',
        rating: 4.2,
        image: '/placeholder.svg' 
      }
    ]
  });
});

// Get store by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  // In a real app, fetch from database
  res.json({
    success: true,
    store: {
      id: parseInt(id),
      name: 'Coffee Haven', 
      email: 'info@coffeehaven.com', 
      address: '123 Main St, New York',
      description: 'A cozy coffee shop with a wide variety of specialty coffees and pastries.',
      rating: 4.5,
      image: '/placeholder.svg'
    }
  });
});

// Create store
router.post('/', (req, res) => {
  const { name, email, address, description } = req.body;
  
  // In a real app, save to database
  res.json({
    success: true,
    message: 'Store created successfully',
    store: {
      id: 4,
      name,
      email,
      address,
      description,
      rating: 0,
      image: '/placeholder.svg'
    }
  });
});

// Update store
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, address, description } = req.body;
  
  // In a real app, update in database
  res.json({
    success: true,
    message: 'Store updated successfully',
    store: {
      id: parseInt(id),
      name,
      email,
      address,
      description,
      rating: 4.5,
      image: '/placeholder.svg'
    }
  });
});

// Delete store
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // In a real app, delete from database
  res.json({
    success: true,
    message: 'Store deleted successfully'
  });
});

module.exports = router;
