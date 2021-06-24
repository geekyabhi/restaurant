const mongoose =require('mongoose')

const bookingSchema = mongoose.Schema(
    {
        bookingBy:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        tableBooked: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Table',
        },
        dateOfBooking:{
            type:Date,
            required:true
        },
        tableBookedForDate:{
            type:Date,
            required:true
        }
    },
    {
        timestamps: true,
    }
)

const Bookings = mongoose.model('Bookings', bookingSchema)
module.exports=Bookings