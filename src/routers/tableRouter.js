const { addTable, updateTable, getTableDetail, getAllTableDetails, getTableDetailForAdmin, deleteTable } = require('../controllers/tableController')
const { adminProtect } = require('../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').get(getAllTableDetails)
router.route('/').post(adminProtect,addTable)
router.route('/:id').get(getTableDetail)
router.route('/:id').put(adminProtect,updateTable)
router.route('/admin/:id').get(adminProtect,getTableDetailForAdmin)
router.route('/:id').delete(adminProtect,deleteTable)

module.exports=router