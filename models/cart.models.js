const mongoose = require("mongoose")
const cartSchema = mongoose.Schema(
    {
        user_id: {type:mongoose.Types.ObjectId,ref:"users"},
        product_id: {type:mongoose.Types.ObjectId,ref:"products"},
         quantity:{type:String},
        status: {type:Boolean,default:true}
    },{timestamps:true}
)
module.exports = mongoose.model("cart", cartSchema)