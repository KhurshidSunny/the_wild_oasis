// scripts/seed-bookings.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { bookings } from '../data/data-bookings.js'; // Adjust path if needed
import Booking from '../models/bookings.js'; // Your Booking model

dotenv.config();

const URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const seedBookings = async () => {
  try {
    await mongoose.connect(URI);
    console.log('✅ Connected to MongoDB');

    // Optional: clear existing bookings
    await Booking.deleteMany();

    // Insert bookings from data file
    await Booking.insertMany(bookings);

    console.log('✅ Bookings seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding bookings:', err);
    process.exit(1);
  }
};

seedBookings();
