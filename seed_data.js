const mongoose = require('mongoose');
const Hotel = require('./src/models/Hotel');
const Room = require('./src/models/Room');
require('dotenv').config();

const hotels = [
    {
        name: "Grand Luxury Palace",
        location: { city: "Dubai", address: "Palm Jumeirah", country: "UAE" },
        description: "Experience world-class service at Grand Luxury Palace. Featuring a private beach, 3 pools, and 5 gourmet restaurants.",
        stars: 5,
        rating: 4.8,
        amenities: ["Private Beach", "Spa", "Gym", "Pool", "Free WiFi"],
        images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"]
    },
    {
        name: "Mountain Retreat Resort",
        location: { city: "Aspen", address: "Highland Peak", country: "USA" },
        description: "A cozy escape in the mountains. Perfect for skiing and relaxation with heated pools and fireplaces.",
        stars: 4,
        rating: 4.6,
        amenities: ["Ski Access", "Heated Pool", "Fireplace", "Restaurant"],
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80"]
    },
    {
        name: "Urban City Loft",
        location: { city: "London", address: "Oxford Street", country: "UK" },
        description: "Stay in the heart of London. Modern amenities, rooftop bar, and minutes away from shopping districts.",
        stars: 4,
        rating: 4.3,
        amenities: ["Rooftop Bar", "Gym", "Concierge", "WiFi"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_booking');
        console.log('MongoDB Connected');

        await Hotel.deleteMany({});
        await Room.deleteMany({});

        for (const hotelData of hotels) {
            const hotel = await Hotel.create(hotelData);
            console.log(`Created Hotel: ${hotel.name}`);

            // Create Rooms
            await Room.create([
                { hotel: hotel._id, type: 'Deluxe', price: 250, capacity: 2 },
                { hotel: hotel._id, type: 'Suite', price: 500, capacity: 4 }
            ]);
        }

        console.log('Database Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
