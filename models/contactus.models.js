const mongoose = require("mongoose")
const contactusSchema = mongoose.Schema(
    {
        name:{type:String},
        image:{type:String},
        email:{type:String},
        message:{type:String},
        address:{type:String},
        phone:{type:Number},


        status:{type:Boolean,default:true}
    }
    ,{timestamps: true}
)
module.exports = mongoose.model("contactUS", contactusSchema)