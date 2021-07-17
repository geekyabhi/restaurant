const {getTableDetail, getAllTableDetails} = require('../controllers/tableController')

const router=require('express').Router()

router.route('/').get(getAllTableDetails) // api/user/table
router.route('/:id').get(getTableDetail) // api/user/table/:id

module.exports=router