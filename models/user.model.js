const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        mobile: { type: Number },
        DOB: { type: Date },
        image: { type: String },
        role: { type: Number, default: 2 },
        address: { type: String },
        status: { type: Boolean, default: true }
    }, { timestamps: true }
)
module.exports = mongoose.model("users", userSchema)