const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    type: {
        type: String,
        enum: ['Single', 'Double', 'Suite', 'Deluxe'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    images: [String]
});

module.exports = mongoose.model('Room', RoomSchema);
