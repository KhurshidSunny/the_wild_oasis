const Setting = require('../models/settings')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const createSetting = catchAsync(async (req, res) => {
        const setting = await Setting.create(req.body)

        res.status(201).json({
            status: 'success',
            data: setting
        })
})

const getSettings = catchAsync(async (req, res) => {
    const settings = await Setting.find();


    res.status(200).json({
        status: 'success',
        results: settings.length,
        data: {settings}
    })
})

const updateSetting = catchAsync(async (req, res, next) => {
            const {id} = req.params;
            const setting = await Setting.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            })

            if(!setting){
                return next(new AppError('Setting not found', 404))
            }

            res.status(200).json({
                status: 'success',
                data: setting
            })
})

module.exports = {createSetting, updateSetting, getSettings}