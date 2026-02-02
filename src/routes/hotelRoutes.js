const express = require('express');
const router = express.Router();
const { getHotels, getHotelDetails, createHotel, seedHotels } = require('../controllers/hotelController');

router.get('/seed', seedHotels); // New Seed Route
router.get('/', getHotels);
router.get('/:id', getHotelDetails);
router.post('/', createHotel);

module.exports = router;
