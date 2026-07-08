
const express = require("express");
const cartController = require("../controller/cart.controller");
const router = express.Router();

router.post("/Add-cart",cartController.addCart)
router.get("/view-cart/:user_id",cartController.viewCart)
router.post("/remove-from-cart",cartController.removeUserCartItems)

module.exports = router;