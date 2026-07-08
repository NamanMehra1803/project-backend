const mongoose = require("mongoose")

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database not connected")
        console.log(error)
        
    }
}
module.exports = connectDb;