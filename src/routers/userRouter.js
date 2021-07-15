const router=require('express').Router()
const {login, register, updateUserProfile} =require('../controllers/userController')

router.route('/').post(login)
router.route('/register').post(register)
router.route('/updateprofile').put(updateUserProfile)
module.exports=router