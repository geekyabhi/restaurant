const { addBooking, getAllBooking, getBooking ,updateBooking,deleteBooking} = require('../controllers/bookingController')
const { adminProtect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(adminProtect,addBooking)
router.route('/').get(adminProtect,getAllBooking)
router.route('/:id').get(adminProtect,getBooking)
router.route('/:id').put(adminProtect,updateBooking)
router.route('/:id').delete(adminProtect,deleteBooking)

module.exports=router