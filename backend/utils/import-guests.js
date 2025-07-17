// import-guests.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Guest from '../models/guests.js';
import { guests } from '../data/data-guests.js';
dotenv.config();

const URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

(async () => {
  try {
    await mongoose.connect(URI);
    console.log('✅ Database connected');

    // Optional: clear old data first
    await Guest.deleteMany();

    await Guest.create(guests);
    console.log('✅ Guests successfully inserted!');
  } catch (err) {
    console.error('❌ Error inserting guests:', err.message);
  } finally {
    mongoose.connection.close();
  }
})();
