const AppError = require("../utils/appError")

const sendErrorDev = (err, res) => {
    if (res.headersSent) return;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    
    // Operational, trusted error, send message to client
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })

    // Programming or other unknown error
    }else {
        console.log('Error', err)

        // Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })

    }
}


const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path} ${err.value}`
    return new AppError(message, 400);
}


const handleDuplicateFieldsDB = (err) => {
    const value = err.errorResponse.errmsg?.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate Field value: ${value}. please use another value`
    return new AppError(message, 400)
}

const handValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join(", ")}`;
    return new AppError(message, 400)
}

const handleJWTError  =  () => new AppError('Invalid token. Please login again', 401)

const handleTokenExpiredError = () => new AppError('Token expired. Please login again', 401)


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (res.headersSent) return;


    if(process.env.NODE_ENV === "development") {
        sendErrorDev(err, res)
        
    }else if(process.env.NODE_ENV === "production") {

        let error = Object.assign(new AppError(err.message, err.statusCoce), err)


        if(error.name === "CastError") handleCastErrorDB(error)
        
        if(error.code === 11000 ) error = handleDuplicateFieldsDB(error)

        if(error.name === "ValidationError") error =  handValidationErrorDB(error) 
        
        if(error.name === "JsonWebTokenError") error = handleJWTError()
        
        if(error.name === "TokenExpiredError") error = handleTokenExpiredError()

        sendErrorProd(error, res)
    }
}