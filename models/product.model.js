const mongoose = require("mongoose")
const productSchema = mongoose.Schema(
    {
        name: {type:String},
        description: {type:String},
        cat_id: {type:mongoose.Types.ObjectId,ref:"category"},
        price: {type:Number},
        image : {type:String},
        status: {type:Boolean,default:true}
    },{timestamps:true}
)

module.exports = mongoose.model("products",productSchema)

