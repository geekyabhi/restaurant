const Table = require("../models/tableModel")

const addTable=async(req,res)=>{
    try{
        const {number,price}=req.body
        const existingTable=await Table.findOne({number})
        if(existingTable){
            return res.status(400).json({
                success:false,
                error:'Table with this number already exist'
            })
        }
        const admin=req.user
        if(!admin){
            return res.status(401).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        const table=new Table({number,price,addedBy:admin,bookingList:[]})
        const savedTable=await table.save()
        if(savedTable)
            return res.status(201).json({
                success:true,
                data:savedTable
            })
        else
            return res.status(400).json({
                success:false,
                error:'Invalid Table data'
            })

    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const getTableDetail=async(req,res)=>{
    try{
        const id=req.params.id
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

const getTableDetailForAdmin=async(req,res)=>{
    try{
        
        const admin=req.user
        if(!admin){
            return res.status(401).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        const id=req.params.id
        if(!id){
            return res.status(400).json({
                success:false,
                error:'No id detected'
            })
        }
        const table=await Table.findById(id).populate('addedBy')
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
                addedBy:table.addedBy,
                bookingList:table.bookingList
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



const updateTable=async(req,res)=>{
    try{
        const {number,price,bookingList}=req.body
        if(!req.params.id){
            return req.status(400).json({
                success:false,
                error:'No id detected'
            })
        }
        const table=await Table.findById(req.params.id)
        if(!table){
            return res.status(404).json({
                success:false,
                error:'Table does not exist'
            })
        }
        const admin=req.user
        if(!admin){
            return res.status(401).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        if(table){
            table.number=number||table.number
            table.price=price||table.price
            table.bookingList=bookingList||table.bookingList
        }
        const updatedTable=await table.save()
        if(updatedTable){
            res.status(200).json({
                success:true,
                data:updatedTable
            })
        }else{
            return res.status(400).json({
                success:false,
                error:'Wrong Table data'
            })
        }
    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const deleteTable=async(req,res)=>{
    try{
        const admin=req.user
        if(!admin){
            return res.status(401).json({
                success:false,
                error:'Not authorized as admin'
            })
        }
        if(!req.params.id){
            return req.status(400).json({
                success:false,
                error:'No id detected'
            })
        }
        const table=await Table.findById(req.params.id)
        if(!table){
            return res.status(404).json({
                success:false,
                error:'Table does not exist'
            })
        }
        if(table.isBooked){
            return res.status(404).json({
                success:false,
                error:'Table is Booked by someone'
            })
        }
        const deletedTable=await table.remove()
        if(deletedTable){
            res.status(200).json({
                success:true,
                data:deletedTable
            })
        }
    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

module.exports={addTable,updateTable,getTableDetail,getAllTableDetails,getTableDetailForAdmin,deleteTable}