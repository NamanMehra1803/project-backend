const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

router.post("/order", orderController.addOrder);       
router.post("/orders-view", orderController.viewOrders); 
router.post("/order-delete", orderController.deleteOrder); 
router.post("/order-Search", orderController.OrderSearch);   
router.post("/Cancel-from-Order", orderController.OrderCancel);



module.exports = router;
