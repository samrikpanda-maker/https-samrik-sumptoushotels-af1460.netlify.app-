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

// @desc    Seed Hotels (Quick Setup)
// @route   GET /api/hotels/seed
// @access  Public
exports.seedHotels = async (req, res) => {
    try {
        await Hotel.deleteMany(); // Clear existing
        const hotels = [
            {
                name: "Grand Luxury Hotel",
                location: { city: "Paris", address: "12 Champs Elysees", country: "France" },
                description: "Experience the epitome of luxury in the heart of Paris. Features 5-star dining and spa.",
                stars: 5,
                rating: 4.8,
                amenities: ["Spa", "Pool", "Gym", "WiFi", "Restaurant"],
                images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3"]
            },
            {
                name: "Ocean View Resort",
                location: { city: "Bali", address: "Kuta Beach", country: "Indonesia" },
                description: "Relax by the ocean in our stunning beachside resort. Perfect for honeymoons.",
                stars: 4,
                rating: 4.5,
                amenities: ["Beach Access", "Pool", "Bar", "WiFi"],
                images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1571896349842-6e53ce41be03?ixlib=rb-4.0.3"]
            },
            {
                name: "Mountain Retreat",
                location: { city: "Aspen", address: "High Peaks Dr", country: "USA" },
                description: "Cozy mountain lodge perfect for skiing and winter getaways.",
                stars: 4,
                rating: 4.7,
                amenities: ["Skiing", "Fireplace", "Restaurant", "WiFi"],
                images: ["https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-4.0.3"]
            },
            {
                name: "Urban City Stay",
                location: { city: "New York", address: "5th Avenue", country: "USA" },
                description: "Modern hotel in the center of the bustling city. Close to all attractions.",
                stars: 3,
                rating: 4.2,
                amenities: ["Gym", "WiFi", "Business Center"],
                images: ["https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3"]
            },
            {
                name: "Sunset Paradise",
                location: { city: "Maldives", address: "Private Island", country: "Maldives" },
                description: "Overwater bungalows with direct ocean access. The ultimate tropical escape.",
                stars: 5,
                rating: 4.9,
                amenities: ["Beach Access", "Spa", "Pool", "WiFi", "Bar"],
                images: ["https://images.unsplash.com/photo-1439066615861-d1fb8cac3dae?ixlib=rb-4.0.3"]
            }
        ];

        await Hotel.insertMany(hotels);
        res.status(201).json({ success: true, message: "Database Seeded with 5 Hotels!", count: hotels.length });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
