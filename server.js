const express=require('express')
const connectDB = require('./src/db/mongoose')
require('colors')
const app=express()
connectDB()
app.use(express.json())
const PORT=process.env.PORT||5000

const userRouter=require('./src/routers/userRouter')
const tableRouter=require('./src/routers/tableRouter')
app.use('/api/user',userRouter)
app.use('/api/table',tableRouter)

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`.yellow)})