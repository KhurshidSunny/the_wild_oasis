const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const app = require('./app');

// connection string
const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(database, {
  
}).then(() => console.log(`Database Successfully connected!`)).catch((err) => console.log(`Error connecting Database ${err.message}`))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})