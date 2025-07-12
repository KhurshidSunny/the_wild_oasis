const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')


const URI =  process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
console.log(URI)

// Connect to MongooDB
mongoose.connect(URI).then(() => console.log(`Database successfully connected`)).catch((err) => console.log(`DB Error ${err}`))


// Run the server
app.listen(8000, () => {
    console.log(`Server running on port 8000`)
})