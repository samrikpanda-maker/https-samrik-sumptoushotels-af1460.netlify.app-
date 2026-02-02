const express = require('express');
const router = express.Router();
const { getHotels, getHotelDetails, createHotel } = require('../controllers/hotelController');

router.get('/', getHotels);
router.get('/:id', getHotelDetails);
router.post('/', createHotel);

module.exports = router;
