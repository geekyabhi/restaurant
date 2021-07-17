const { addTable, updateTable, getTableDetail, getAllTableDetails, deleteTable } = require('../controllers/tableController')
const { adminProtect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(adminProtect,addTable)
router.route('/').get(adminProtect,getAllTableDetails)
router.route('/:id').put(adminProtect,updateTable)
router.route('/:id').get(adminProtect,getTableDetail)
router.route('/:id').delete(adminProtect,deleteTable)

module.exports=router