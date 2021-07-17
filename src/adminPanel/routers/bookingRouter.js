const { addBooking, getAllBooking, getBooking } = require('../controllers/bookingController')
const { adminProtect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(adminProtect,addBooking)
router.route('/').get(adminProtect,getAllBooking)
router.route('/:id').get(adminProtect,getBooking)

module.exports=router