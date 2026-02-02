const express = require('express');
const router = express.Router();
const { processPayment, getPayment, refundPayment } = require('../controllers/paymentController');

router.post('/', processPayment);
router.get('/:id', getPayment);
router.post('/:id/refund', refundPayment);

module.exports = router;
