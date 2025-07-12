const express = require('express')
const cabinController = require('../controllers/cabinController')

const router = express.Router();

// router.route('/').get(cabinController.getCabins).post(cabinController.createCabin)
// router.route('/:cabin_id').get(cabinController.getCabin).patch(cabinController.updateCabin).delete(cabinController.deleteCabin)


router.get('/',cabinController.getCabins)
router.post('/', cabinController.createCabin)
router.get('/:cabin_id', cabinController.getCabin)
router.patch('/:cabin_id', cabinController.updateCabin)
router.delete('/:cabin_id', cabinController.deleteCabin)





module.exports = router;