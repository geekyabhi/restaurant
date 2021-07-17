const router=require('express').Router()
const {updateUserProfile, getAllUsers} =require('../controllers/userController')
const { protect, adminProtect } = require('../../middleware/authMiddlewere')

router.route('/').get(adminProtect,getAllUsers)
router.route('/:id').get(adminProtect)
router.route('/:id').put(protect,updateUserProfile)
module.exports=router