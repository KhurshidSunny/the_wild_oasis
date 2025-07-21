const express = require('express')
const authController = require('../controllers/authController')
const  {uploadImage, uploadToS3} = require('../middleware/uploadImage')

const router = express.Router();

router.post('/signup',uploadImage, uploadToS3('users'), authController.signup)
router.post('/login', authController.login)
// router.patch('/updateMyPassword', authController.protect, authController.passwordUpdate)
router.patch('/updateMyPassword', authController.passwordUpdate)
router.patch('/updateCurrentUser', uploadImage, uploadToS3('users'), authController.updateCurrentUser)


router.get('/', authController.getAllUsers)
// router.get('/me', authController.protect, authController.getMe, authController.getUser)
router.get('/me', authController.getMe, authController.getUser)
router.get('/:id', authController.getUser)

module.exports = router