const Bookings = require("../../models/bookingModel")
const Table = require("../../models/tableModel")
const User=require('../../models/userModel')
const moment=require('moment')


const addBooking=async(req,res)=>{
    try{
        const user=req.user
        if(!user){
            return res.status(401).json({
                success:false,
                error:'Not authorized'
            })
        }
        const {tableId,dateOfBooking,tableBookedForDate}=req.body
        
        const table=await Table.findById(tableId)
        if(!table){
            return res.status(400).json({
                success:false,
                error:'No such table exist'
            })
        }

        let alreadyBooked
        
        table.bookingList.forEach((booking)=>{
            if(moment(booking.date).isSame(tableBookedForDate))
                alreadyBooked=true
        })

        if(alreadyBooked){
            return res.status(400).json({
                success:false,
                error:'Table already booked for that time'
            })
        }

        const booking =new Bookings({tableBooked:tableId,dateOfBooking,tableBookedForDate,bookingBy:user._id})
        const savedBooking=await booking.save()
        if(savedBooking){
            table.bookedBy=user._id
            table.bookingList=[...table.bookingList,{
                bookedBy:user._id,
                date:tableBookedForDate
            }]
            await table.save()

            user.tablesBooked=[...user.tablesBooked,table]
            await user.save()

            res.status(200).json({
                success:true,
                data:savedBooking
            })
        }
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const getBooking=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({
                success:false,
                error:'Cannot detect the id'
            })
        }

        const user=req.user
        if(!user){
            return res.status(400).json({
                success:false,
                error:'Not authorized'
            })
        }
        const booking =await Bookings.findById(id).populate(['bookingBy','tableBooked'])
        if(!booking){
            return res.status(400).json({
                success:false,
                error:'No such booking found'
            })
        }
        if(booking.bookingBy._id!==user._id){
            return res.status(404).json({
                success:false,
                error:'Not authorized'
            })
        }
        res.status(200).json({
            success:true,
            data:booking
        }) 
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const getAllBooking=async(req,res)=>{
    try{
        const user={req,res}
        if(!user){
            return res.status(400).json({
                success:false,
                error:'Not authorized'
            })
        }
        const bookings=await Bookings.find({bookingBy:user}).populate(['bookingBy','tableBooked'])
        if(!bookings){
            return res.status(404).json({
                success:false,
                error:'Not found'
            })
        }
        res.status(200).json({
            success:true,
            data:bookings
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const deleteBooking=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({
                success:false,
                error:'Cannot detect the id'
            })
        }
        const user=req.user
        if(!user){
            return res.status(400).json({
                success:false,
                error:'Not authorized'
            })
        }
        const booking =await Bookings.findById(id).populate(['bookingBy','tableBooked'])
        if(!booking){
            return res.status(400).json({
                success:false,
                error:'No such booking found'
            })
        }
        if(booking.bookingBy._id!==user._id){
            return res.status(404).json({
                success:false,
                error:'Not authorized'
            })
        }
        const deletedBooking=await booking.remove()

        const tableId=booking.tableBooked._id
        const tableBookedForDate=booking.tableBooked.tableBookedForDate
        const table=await Table.findById(tableId)
        table.bookingList=table.bookingList.filter((booking)=>!moment(booking.date).isSame(tableBookedForDate))

        const updatedTable=await table.save()
        const userId=booking.bookingBy._id
        const userCheck=await User.findById(userId)
        userCheck.tablesBooked=userCheck.tablesBooked.filter((table)=>table._id!==tableId)
        const updatedUser=await userCheck.save()

        res.status(200).json({
            success:true,
            data:deletedBooking
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

module.exports={addBooking,getBooking,getAllBooking,deleteBooking}