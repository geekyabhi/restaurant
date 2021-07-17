const Bookings = require("../../models/bookingModel")
const Table = require("../../models/tableModel")
const User=require('../../models/userModel')
const moment=require('moment')


const addBooking=async(req,res)=>{
    try{
        const admin=req.user
        if(!(admin && admin.isAdmin)){
            return res.status(401).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        const {tableId,dateOfBooking,tableBookedForDate,userId}=req.body
        
        const table=await Table.findById(tableId)
        if(!table){
            return res.status(400).json({
                success:false,
                error:'No such table exist'
            })
        }
        if(!userId){
            return res.status(400).json({
                success:false,
                error:'Enter the user id'
            })
        }
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success:false,
                error:'No such user found'
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
        const admin=req.user
        if(!(admin && admin.isAdmin)){
            return res.status(400).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        const booking =await Bookings.findById(id)
        if(!booking){
            return res.status(400).json({
                success:false,
                error:'No such booking found'
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
        const admin=req.user
        const {userId}=req.body
        if(!(admin&&admin.isAdmin)){
            return res.status(400).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success:false,
                error:'No such user found'
            })
        }
        let bookings
        if(userId){
            bookings=await Bookings.find({bookingBy:user})
        }else{
            bookings=await Bookings.find({})
        }
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

const updateBooking=async(req,res)=>{
    try{

    }catch(e){

    }
}

const deleteBooking=async(req,res)=>{
    try{
        const {id}=req.params
        const admin=req.user
        if(!id){
            return res.status(400).json({
                success:false,
                error:'No id Detected'
            })
        }
        if(!(admin&&admin.isAdmin)){
            return res.status(400).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        const booking=await Bookings.findById(id).populate(['tableBooked','bookingBy'])
        if(!booking){
            return res.status(404).json({
                success:false,
                error:'No such booking found'
            })
        }
        const deletedBooking=await booking.remove()
        const tableId=booking.tableBooked._id
        const tableBookedForDate=booking.tableBooked.tableBookedForDate
        const table=await Table.findById(tableId)
        table.bookingList=table.bookingList.filter((booking)=>!moment(booking.date).isSame(tableBookedForDate))

        const updatedTable=await table.save()
        const userId=booking.bookingBy._id
        const user=await User.findById(userId)
        user.tablesBooked=user.tablesBooked.filter((table)=>table._id!==tableId)
        const updatedUser=await user.save()

        res.status(201).json({
            success:true,
            data:deleteBooking
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

module.exports={addBooking,getBooking,getAllBooking,updateBooking,deleteBooking}