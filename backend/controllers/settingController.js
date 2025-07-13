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

module.exports = {createSetting, updateSetting}