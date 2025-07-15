const express = require('express')
const authController = require('../controllers/authController')
const  {uploadImage, uploadToS3} = require('../middleware/uploadImage')

const router = express.Router();

router.post('/signup',uploadImage, uploadToS3('users'), authController.signup)
router.post('/login', authController.login)
router.patch('/updateMyPassword', authController.protect, authController.passwordUpdate)


router.get('/', authController.getAllUsers)
router.get('/me', authController.protect, authController.getMe, authController.getUser)
router.get('/:id', authController.getUser)

module.exports = router