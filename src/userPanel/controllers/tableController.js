const Table = require('../../models/tableModel')

const getTableDetail=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({
                success:false,
                error:'No id detected'
            })
        }
        const table=await Table.findById(id)
        if(!table){
            return res.status(400).json({
                success:false,
                error:'No such table found'
            })
        }
        res.status(200).json({
            success:true,
            data:{
                _id:table._id,
                price:table.price,
                number:table.number,
                bookingList:table.bookingList.map((booking)=>booking.date)
            }
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const getAllTableDetails=async(req,res)=>{
    try{
        const tables=await Table.find({}).select(['-bookedBy','-addedBy'])
        res.status(200).json({
            success:true,
            data:tables
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

module.exports={getTableDetail,getAllTableDetails}