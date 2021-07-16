const { addTable } = require('../controllers/tableController')
const { adminProtect } = require('../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(adminProtect,addTable)

module.exports=router