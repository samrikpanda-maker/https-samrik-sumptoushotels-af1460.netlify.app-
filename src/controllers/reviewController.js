const Review = require('../models/Review');

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private (User)
exports.addReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get reviews for a hotel
// @route   GET /api/reviews/hotel/:hotelId
// @access  Public
exports.getHotelReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ hotelId: req.params.hotelId, isApproved: true });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Moderate Review (Approve/Reject)
// @route   PATCH /api/reviews/:id/approve
// @access  Admin
exports.approveReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

        review.isApproved = true;
        await review.save();

        res.status(200).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
