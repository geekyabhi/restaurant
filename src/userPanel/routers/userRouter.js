const router=require('express').Router()
const {login, register, updateUserProfile} =require('../controllers/userController')
const { protect } = require('../../middleware/authMiddlewere')

router.route('/login').post(login)
router.route('/').post(register)
router.route('/updateprofile').put(protect,updateUserProfile)
module.exports=router