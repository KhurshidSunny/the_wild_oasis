const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(`UNCAUGHT EXCEPTION! Shutting down...`);
  console.log(`${err.name}: ${err.message}`);
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./.env" });

const app = require("./app");

// connection string
const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(database, {})
  .then(() => console.log(`Database Successfully connected!`))
  .catch((err) => console.log(`Error connecting Database ${err.message}`));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
