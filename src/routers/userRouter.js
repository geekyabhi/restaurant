const router=require('express').Router()
const {login} =require('../controllers/userController')

router.route('/').post(login)

module.exports=router