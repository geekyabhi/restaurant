const mongoose =require('mongoose')

const tablechema = mongoose.Schema(
    {
        bookedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        number: {
            type: String,
            required: true,
            unique:true
        },
        price:{
            type: String,
            required: true,
        },
        isBooked:{
            type:Boolean,
            default:false
        },
        addedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true,
    }
)

const Table = mongoose.model('Table', tablechema)
module.exports=Table