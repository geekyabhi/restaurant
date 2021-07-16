const { addBooking } = require('../controllers/bookingController')
const { protect } = require('../middleware/authMiddlewere')

const router=require('express').Router()

router.route('/').post(protect,addBooking)

module.exports=router