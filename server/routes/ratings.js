
const express = require('express');
const router = express.Router();

// Get all ratings
router.get('/', (req, res) => {
  // In a real app, fetch from database
  res.json({
    success: true,
    ratings: [
      { id: 1, storeId: 1, userId: 2, rating: 5, date: '2023-05-10' },
      { id: 2, storeId: 1, userId: 3, rating: 4, date: '2023-05-08' },
      { id: 3, storeId: 2, userId: 2, rating: 3, date: '2023-05-05' }
    ]
  });
});

// Get ratings by store ID
router.get('/store/:storeId', (req, res) => {
  const { storeId } = req.params;
  
  // In a real app, fetch from database
  res.json({
    success: true,
    ratings: [
      { id: 1, storeId: parseInt(storeId), userId: 2, username: 'Jane Smith', rating: 5, date: '2023-05-10' },
      { id: 2, storeId: parseInt(storeId), userId: 3, username: 'Bob Johnson', rating: 4, date: '2023-05-08' }
    ]
  });
});

// Get ratings by user ID
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  
  // In a real app, fetch from database
  res.json({
    success: true,
    ratings: [
      { 
        id: 1, 
        storeId: 1, 
        storeName: 'Coffee Haven',
        userId: parseInt(userId), 
        rating: 5, 
        date: '2023-05-10' 
      },
      { 
        id: 3, 
        storeId: 2, 
        storeName: 'Tech Galaxy',
        userId: parseInt(userId), 
        rating: 3, 
        date: '2023-05-05' 
      }
    ]
  });
});

// Submit a rating
router.post('/', (req, res) => {
  const { storeId, userId, rating } = req.body;
  
  // In a real app, save to database
  res.json({
    success: true,
    message: 'Rating submitted successfully',
    rating: {
      id: 4,
      storeId,
      userId,
      rating,
      date: new Date().toISOString().split('T')[0]
    }
  });
});

// Update a rating
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  
  // In a real app, update in database
  res.json({
    success: true,
    message: 'Rating updated successfully',
    rating: {
      id: parseInt(id),
      rating,
      date: new Date().toISOString().split('T')[0]
    }
  });
});

// Delete a rating
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // In a real app, delete from database
  res.json({
    success: true,
    message: 'Rating deleted successfully'
  });
});

module.exports = router;
