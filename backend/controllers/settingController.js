const Setting = require('../models/settings')

const createSetting = async (req, res) => {
    try{
        const setting = await Setting.create(req.body)

        res.status(201).json({
            status: 'success',
            data: setting
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })

    }
}

const updateSetting = async (req, res) => {
        try{
            const {id} = req.params;
            const setting = await Setting.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            })

            if(!setting){
                return res.status(404).json({
                    status: 'fail',
                    message: 'setting could not found'
                })
            }

            res.status(200).json({
                status: 'success',
                data: setting
            })

        }catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message
            })

        }
}

module.exports = {createSetting, updateSetting}