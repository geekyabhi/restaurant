const { addBooking, getAllBooking, getBooking, deleteBooking } = require('../controllers/bookingController')
const { protect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(protect,addBooking) // api/user/booking
router.route('/').get(protect,getAllBooking) // api/user/booking
router.route('/:id').get(protect,getBooking) // api/user/booking/:id
router.route('/:id').delete(protect,deleteBooking) // api/user/booking/:id

module.exports=router