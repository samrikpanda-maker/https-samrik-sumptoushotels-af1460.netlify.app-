const express = require('express');
const router = express.Router();
const { addReview, getHotelReviews, approveReview } = require('../controllers/reviewController');

router.post('/', addReview);
router.get('/hotel/:hotelId', getHotelReviews);
router.patch('/:id/approve', approveReview);

module.exports = router;
