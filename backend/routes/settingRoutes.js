const express = require('express')
const settingController = require('../controllers/settingController')

const router = express.Router()

router.get('/', settingController.getSettings)
router.post('/', settingController.createSetting)
router.patch('/:id', settingController.updateSetting)

module.exports = router;