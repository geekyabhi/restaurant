const router=require('express').Router()

const tableRouter=require('./routers/tableRouter')
const bookingRouter=require('./routers/bookingRouter')
const userRouter=require('./routers/userRouter')

router.use('/table',tableRouter)
router.use('/booking',bookingRouter)
router.use('/user',userRouter)

module.exports=router