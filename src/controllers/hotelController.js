const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

// @desc    Get All Hotels (with Filtering)
// @route   GET /api/hotels
// @access  Public
exports.getHotels = async (req, res) => {
    try {
        const { city, minPrice, maxPrice } = req.query;
        let query = {};

        if (city) {
            query['location.city'] = { $regex: city, $options: 'i' };
        }

        const hotels = await Hotel.find(query);
        res.status(200).json({ success: true, count: hotels.length, data: hotels });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Hotel Details (including Rooms)
// @route   GET /api/hotels/:id
// @access  Public
exports.getHotelDetails = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        // Get rooms for this hotel
        const rooms = await Room.find({ hotel: req.params.id });

        res.status(200).json({ success: true, data: { ...hotel._doc, rooms } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create a Hotel (Admin Seeding)
// @route   POST /api/hotels
// @access  Private (Admin only)
exports.createHotel = async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json({ success: true, data: hotel });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
