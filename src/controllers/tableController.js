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
        const table=new Table({number,price,addedBy:admin})
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

module.exports={addTable}