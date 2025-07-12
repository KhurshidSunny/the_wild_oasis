const express = require('express')
const cabinRouter = require('./routes/cabinRoutes')
const settingRouter = require('./routes/settingRoutes')
const guestRouter = require('./routes/guestRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const morgan = require('morgan')


const app = express();

// MIDDLEWARE

// body parser for json
app.use(express.json())

app.use(morgan('dev'))

// ROUTES
app.use('/api/v1/cabins', cabinRouter)
app.use('/api/v1/settings', settingRouter)
app.use('/api/v1/guests', guestRouter)
app.use('/api/v1/bookings', bookingRouter)

// Unhandled Routes
app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`
    });
});

module.exports = app;




