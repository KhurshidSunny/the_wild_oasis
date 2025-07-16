const User = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')


const signToken = (id) => {
     const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token;
}




exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        image: req.file?.location
    });

    // jwt token
    const token = signToken(newUser._id)

    res.password = undefined;

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})


exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if(!email || !password) {
        return next(new AppError('Please provide the password and email', 400));
    }

    // 2) Check if user exist and password is correct
    const user = await User.findOne({email}).select('+password');
    
    if(!user || !await user?.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password', 401))
    }



    // 3) If everything is OK, send to the token to client
    const token = signToken(user._id);


    res.status(200).json({
        status: "success",
        token,
    })
})


exports.protect = catchAsync(async(req, res, next) => {
    let token;
    // 1) Getting token and check if it's there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    console.log(token)

    if(!token) {
        return next(new AppError('You are not logged in. Please login to get access', 401))
    }

    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

    console.log("Decoded token:", decoded);
    
    // 3) Check if user still exist
    const user = await User.findById(decoded.id);
    console.log("User found:", user);
    if(!user) {
        return next(new AppError('The user to this token does no longer exist', 401))
    }

    // 4) check if the user changed the password after token was issues
    if(user.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed the password. please login again', 401))
    }
    
    req.user = user;

    // GRANT ACCESS TO THE PROTECTED ROUTES
    next()
})


exports.passwordUpdate = catchAsync(async(req, res, next) => {
    // 1) Get the user from the Collection
    const {currentPassword, newPassword} = req.body;
    const user = await User.findById(req.user.id).select("+password")


    // 2) Check if POSTed current password is correct
    if(!await user.correctPassword(currentPassword, user.password)){
        return next(new AppError('your current password is wrong', 401))
    }


    // 3) If so, update the password
    user.password= newPassword;
    user.passwordConfirm = newPassword;
    await user.save()

    // 4) Log user in, Send token
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    })
    
})


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    console.log(users)

    res.status(200).json({
        status: 'success',
        total: users.length,
        data: {
            users
        }

    })
})




exports.getUser = catchAsync( async (req, res, next) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user) {
        return next(new AppError('You are not logged in. Please login to get the details'))
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })

})

exports.getMe = (req, res,next) => {
    req.params.id = req.user.id;
    console.log(`Me/ id: ${req.params.id}`)
    next();
}

