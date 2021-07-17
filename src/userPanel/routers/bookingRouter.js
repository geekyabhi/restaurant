const { addBooking, getAllBooking, getBooking, deleteBooking } = require('../controllers/bookingController')
const { protect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(protect,addBooking)
router.route('/').get(protect,getAllBooking)
router.route('/:id').get(protect,getBooking)
router.route('/:id').delete(protect,deleteBooking)

module.exports=router