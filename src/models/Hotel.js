const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        city: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, default: 'India' }
    },
    description: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    amenities: [String], // e.g., ["WiFi", "Pool", "Gym"]
    images: [String], // URLs of images
    rating: {
        type: Number,
        default: 0
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hotel', HotelSchema);
