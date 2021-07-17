const { addBooking, getAllBooking, getBooking } = require('../controllers/bookingController')
const { protect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(protect,addBooking)
router.route('/').get(protect,getAllBooking)
router.route('/:id').get(protect,getBooking)

module.exports=router