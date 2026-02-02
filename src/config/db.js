const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use a local MongoDB string or one from .env
        // For local development ease: mongodb://localhost:27017/hotel_booking
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_booking');

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
