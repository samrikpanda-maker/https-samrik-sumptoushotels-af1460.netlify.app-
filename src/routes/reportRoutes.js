const express = require('express');
const router = express.Router();
const { getBookingReports, getRevenueReports } = require('../controllers/reportController');

router.get('/bookings', getBookingReports);
router.get('/revenue', getRevenueReports);

module.exports = router;
