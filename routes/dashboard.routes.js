const express = require("express")
const dashboardController = require("../controller/dashboard.controller")

const router = express.Router()

router.post("/productViewdashboard",dashboardController.productViewdashboard);
router.post("/userViewdashboard",dashboardController.userViewdashboard);
router.post("/categoryViewdashboard",dashboardController.categoryViewdashboard);


module.exports = router