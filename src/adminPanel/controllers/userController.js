const User=require('../../models/userModel')
const generateToken=require('../../utils/generateToken')

const getAllUsers=async(req,res)=>{
    try{
        const admin=req.user
        if(!(admin&&admin.isAdmin)){
            return res.status(401).json({
                success:false,
                error:'Not authorised as admin'
            })
        }
        const users=await User.find({}).select('-password')
        if(!users){
            return res.status(401).json({
                success:false,
                error:'Cannot found users'
            })
        }
        res.status(201).json({
            success:true,
            data:users
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const getOneUsers=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({
                success:false,
                error:"Cannot detect id"
            })
        }
        const admin=req.user
        if(!(admin&&admin.isAdmin)){
            return res.status(401).json({
                success:false,
                error:'Not authorised as admin'
            })
        }
        const user=await User.findById(id).select('-password')
        if(!user){
            return res.status(401).json({
                success:false,
                error:'Cannot found users'
            })
        }
        res.status(201).json({
            success:true,
            data:user
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

const updateUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)
        if(user){
            user.name=req.body.name||user.name
            user.email=req.body.email||user.email
            if(req.body.password){
                user.password=req.body.password
            }
        }
        const updatedUser=await user.save()
        res.status(200).json({
            success:true,
            data:{
                _id:updatedUser._id,
                isAdmin:updatedUser.isAdmin,
                name:updatedUser.name,
                email:updatedUser.email,
                token: generateToken(updatedUser._id)
            }
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

module.exports={updateUserProfile,getAllUsers,getOneUsers}
