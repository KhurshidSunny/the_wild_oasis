const mongoose = require("mongoose");
const Cabin = require("../models/cabinModel");
const Guest = require("../models/guestModel");
const Booking = require("../models/bookingModel");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Database connection string
const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(database, {}).then(() => {
  console.log("DB Connection successful");
});

const cabins = JSON.parse(
  fs.readFileSync(`${__dirname}/data-cabins.json`, "utf-8")
);
const guests = JSON.parse(
  fs.readFileSync(`${__dirname}/data-guests.json`, "utf-8")
);
const bookings = JSON.parse(
  fs.readFileSync(`${__dirname}/data-bookings.json`, "utf-8")
);

// Import Data to DB
async function importData() {
  try {
    await Cabin.create(cabins);
    await Booking.create(bookings);
    await Guest.create(guests);
    console.log("Data successfully Loaded!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

async function deleteData() {
  try {
    await Cabin.deleteMany();
    await Booking.deleteMany();
    await Guest.deleteMany();
    console.log("Data successfully Deleted!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
