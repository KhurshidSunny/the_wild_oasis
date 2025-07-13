const Cabin = require('../models/cabins')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')


const createCabin = catchAsync(async (req, res) => {
   
        const newCabin = await Cabin.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newCabin
        })
})

// get all cabins
const getCabins = catchAsync(async (req, res) => {
 
        const cabins = await Cabin.find();
        console.log(cabins)

        res.status(200).json({
            status: 'success',
            total: cabins.length,
            data: cabins
        })
})

const getCabin = catchAsync(async (req, res) => {
 
        console.log(req.params)
        const {cabin_id} = req.params;
        const cabin = await Cabin.findById(cabin_id);

         if(!cabin){
                return next(new AppError('Cabin not found', 404))
            }

        res.status(200).json({
            status: 'success',
            data: cabin
        })
})


const updateCabin = catchAsync(async (req, res) => {
       
            const {cabin_id} = req.params;
            const updatedCabin = await Cabin.findByIdAndUpdate(cabin_id, req.body, {
                new: true,
                runValidators: true
            })

             if(!updatedCabin){
                    return next(new AppError('Cabin not found', 404))
                }

            res.status(200).json({
                status: 'success',
                data: updatedCabin
            })
})

const deleteCabin = catchAsync(async (req, res) => {
  
        const {cabin_id} = req.params;
        const cabin = await Cabin.findByIdAndDelete(cabin_id);

         if(!cabin){
                return next(new AppError('Cabin not found', 404))
            }

        res.status(204).json({
            status: 'success',
            data: null,
        })

})



module.exports = {createCabin, getCabins, getCabin, updateCabin, deleteCabin}