const User=require('../models/userModel')
const generateToken=require('../utils/generateToken')


const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        
        if(user && (await user.matchPassword(password))){
            res.status(200).json({
                success:true,
                data:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    token:generateToken(user._id)
                }
            })
        }else{
            return res.status(401).json({
                success:false,
                error:'Wrong email or password'
            })
        }
    }catch(e){
        return res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}


module.exports={login}
