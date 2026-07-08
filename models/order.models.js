const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
