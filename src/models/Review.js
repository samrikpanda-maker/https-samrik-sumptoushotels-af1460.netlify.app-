const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // User ID reference
        required: true,
        ref: 'User'
    },
    hotelId: {
        type: String, // Or ObjectId if Hotel model exists
        required: true
    },
    bookingId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false // Simple moderation flag
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
