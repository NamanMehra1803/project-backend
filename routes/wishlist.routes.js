const express = require("express");
const wishlistController = require("../controller/wishlist.controller");
const router = express.Router();

router.post("/add-wishlist", wishlistController.addWishlist);
router.get("/view-wishlist/:user_id", wishlistController.viewWishlist);
router.post("/remove-from-wishlist", wishlistController.removeUserWishlistItems);

module.exports = router;
