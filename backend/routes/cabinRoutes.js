const express = require('express')
const cabinController = require('../controllers/cabinController');

const router = express.Router();

router.route('/').get(cabinController.getAllCabins).post(cabinController.createCabin);
router.route('/:cabinId').get(cabinController.getCabin);


module.exports = router; 