const mongoose = require("mongoose")
const categorySchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        image:{ type: String }, 
        status: { type: Boolean, default: true }
    }, { timestamps: true }
)
module.exports = mongoose.model("category", categorySchema)