const { addBooking, getAllBooking, getBooking } = require('../controllers/bookingController')
const { protect } = require('../../middleware/authMiddlewere')

const router=require('express').Router()


module.exports=router