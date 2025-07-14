const express = require('express')
const cabinController = require('../controllers/cabinController')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/').get(authController.protect,cabinController.getCabins).post(cabinController.createCabin)
router.route('/:cabin_id').get(cabinController.getCabin).patch(cabinController.updateCabin).delete(authController.protect,cabinController.deleteCabin)








module.exports = router;