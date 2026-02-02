const express = require('express');
const router = express.Router();
const { createPromoCode, validatePromoCode, getOffers } = require('../controllers/offerController');

router.post('/', createPromoCode);
router.post('/validate', validatePromoCode);
router.get('/', getOffers);

module.exports = router;
