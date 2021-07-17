const {getTableDetail, getAllTableDetails} = require('../controllers/tableController')

const router=require('express').Router()

router.route('/').get(getAllTableDetails)
router.route('/:id').get(getTableDetail)

module.exports=router