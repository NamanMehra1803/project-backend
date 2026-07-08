const express = require("express")
const frontendController = require("../controller/frontend.controller")
const router = express.Router()

router.get("/view-categories/frontend",frontendController.viewCategories)
router.get("/view-products/frontend",frontendController.viewproducts)
router.get("/viewall-category/frontend",frontendController.viewallCategories)
router.post("/viewall-products-/frontend",frontendController.viewAllproducts)
router.post("/view-product-/frontend",frontendController.viewProductById)
router.post("/view-productCat_id-/frontend",frontendController.viewProductBycatId)
router.get("/view-Order/:user_id",frontendController.FrontOrder)




module.exports = router