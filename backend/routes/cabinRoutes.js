const express = require('express')
const cabinController = require('../controllers/cabinController')
const authController = require('../controllers/authController')
const {uploadImage, uploadToS3} = require('../middleware/uploadImage')

const router = express.Router();

router.route('/').get(authController.protect,cabinController.getCabins).post(uploadImage, uploadToS3('cabins'), cabinController.createCabin)
router.route('/:cabin_id').get(cabinController.getCabin).patch(uploadImage, uploadToS3('cabins'),cabinController.updateCabin).delete(authController.protect,cabinController.deleteCabin)








module.exports = router;