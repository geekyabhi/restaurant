const mongoose =require('mongoose')

const tablechema = mongoose.Schema(
    {
        number: {
            type: String,
            required: true,
            unique:true
        },
        price:{
            type: String,
            required: true,
        },
        bookingList:[
            {
                bookedBy:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
                date:{
                    type:Date
                }
            }
        ],
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