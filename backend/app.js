const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cabinRouter = require('./routes/cabinRoutes')
const settingRouter = require('./routes/settingRoutes')
const guestRouter = require('./routes/guestRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')



const app = express();

// GLOBAL MIDDLEWARE

app.use(helmet())

// body parser for json
app.use(express.json( {limit: '20kb'}))

// Data Sanitiztion against NoSQL query injection
app.use(mongoSanitize())

// Data Sanitize XSS (cross Sit scripting)
app.use(xss())

app.use(morgan('dev'))

// rate limiter
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 100 requests in 60 minutes
    max: 100,
    message: "Too many requests from this IP, Please try again in an hour"
})

// applying rate limit to all the routes
app.use(limiter)

// ROUTES
app.use('/api/v1/cabins', cabinRouter)
app.use('/api/v1/settings', settingRouter)
app.use('/api/v1/guests', guestRouter)
app.use('/api/v1/bookings', bookingRouter)
app.use('/api/v1/users', userRouter)


// Unhandled Routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
});

// Global Error Handler
app.use(globalErrorHandler)

module.exports = app;




