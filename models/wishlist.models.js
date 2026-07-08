const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
    {
        user_id: { type: mongoose.Types.ObjectId, ref: "users" },
        product_id: { type: mongoose.Types.ObjectId, ref: "products" },
        status: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("wishlist", wishlistSchema);
