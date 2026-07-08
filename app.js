const express = require('express')
var cors = require('cors');

const app = express()
const { errors } = require("celebrate");
require('dotenv').config()
const connectDb = require("./config/db")

app.use(cors())
app.use(express.json());
app.use(errors());

app.use("/uploads" , express.static("uploads"));
app.use(require("./routes/user.routes"))
app.use(require("./routes/category.routes"))
app.use(require("./routes/product.routes"))
app.use(require("./routes/contactus.routes"))
app.use(require("./routes/dashboard.routes"))
app.use(require("./routes/frontend.routes"))
app.use(require("./routes/cart.routes"))
app.use(require("./routes/wishlist.routes"))
app.use(require("./routes/order.routes"))


const port = 8080
connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`)
    })
})
