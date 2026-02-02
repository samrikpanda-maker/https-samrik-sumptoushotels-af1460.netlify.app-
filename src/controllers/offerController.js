const PromoCode = require('../models/PromoCode');

// @desc    Create a new promo code
// @route   POST /api/offers
// @access  Admin
exports.createPromoCode = async (req, res) => {
    try {
        const promo = await PromoCode.create(req.body);
        res.status(201).json({ success: true, data: promo });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Validate a promo code
// @route   POST /api/offers/validate
// @access  Public
exports.validatePromoCode = async (req, res) => {
    try {
        const { code, bookingAmount } = req.body;

        const promo = await PromoCode.findOne({ code, isActive: true });

        if (!promo) {
            return res.status(404).json({ success: false, message: 'Invalid or inactive promo code' });
        }

        // Check Expiry
        if (new Date() > promo.validUntil) {
            return res.status(400).json({ success: false, message: 'Promo code expired' });
        }

        // Check Min Booking Amount
        if (bookingAmount < promo.minBookingAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum booking amount of ${promo.minBookingAmount} required`
            });
        }

        // Check Usage Limit
        if (promo.usageLimit > 0 && promo.usedCount >= promo.usageLimit) {
            return res.status(400).json({ success: false, message: 'Promo code usage limit reached' });
        }

        // Calculate Discount
        let discount = 0;
        if (promo.discountType === 'percentage') {
            discount = (bookingAmount * promo.discountValue) / 100;
            if (promo.maxDiscountAmount) {
                discount = Math.min(discount, promo.maxDiscountAmount);
            }
        } else {
            discount = promo.discountValue;
        }

        res.status(200).json({
            success: true,
            data: {
                code: promo.code,
                discount,
                finalAmount: bookingAmount - discount
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    List all offers
// @route   GET /api/offers
// @access  Public
exports.getOffers = async (req, res) => {
    try {
        const offers = await PromoCode.find({ isActive: true, validUntil: { $gte: new Date() } });
        res.status(200).json({ success: true, data: offers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
