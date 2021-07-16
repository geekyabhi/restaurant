const Bookings = require("../models/bookingModel")
const Table = require("../models/tableModel")

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
        const booking =new Bookings({tableBooked:tableId,dateOfBooking,tableBookedForDate,bookingBy:user._id})
        const savedBooking=await booking.save()
        if(savedBooking){
            table.bookedBy=user._id
            table.isBooked=true
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

module.exports={addBooking}