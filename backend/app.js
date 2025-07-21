const express = require('express')
const morgan = require('morgan')
// const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const cabinRouter = require('./routes/cabinRoutes')
const settingRouter = require('./routes/settingRoutes')
const guestRouter = require('./routes/guestRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')



const app = express();

// GLOBAL MIDDLEWARE
app.use(cookieParser())

app.use(helmet())

// body parser for json
app.use(express.json( {limit: '20kb'}))

app.use(morgan('dev'))


const allowedOrigins = [
  'https://the-wild-oasis-murex-gamma.vercel.app',
  'https://the-wild-oasis-cabin-booking-app.vercel.app', // Vercel frontend (production)
  'http://localhost:5173',                         // Local dev (Vite default)
  'http://localhost:3000',                         // If using Create React App
  'https://khurshid-dev.duckdns.org',              // Direct browser API testing (optional)
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// rate limiter
// const limiter = rateLimit({
//     windowMs: 60 * 60 * 1000, // 100 requests in 60 minutes
//     max: 100,
//     message: "Too many requests from this IP, Please try again in an hour"
// })

// applying rate limit to all the routes
// app.use(limiter)

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




