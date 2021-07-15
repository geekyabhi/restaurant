const express=require('express')
require('colors')
const app=express()


const PORT=process.env.PORT||5000

const userRouter=require('./src/routers/userRouter')
app.use('/api/user',userRouter)

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`.yellow)})