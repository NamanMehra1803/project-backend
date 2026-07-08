const express = require("express")
const productController = require("../controller/product.controller")
const productValidation = require("../validations/product.validation")
const fileUpload = require("../middleware/user.middleware")



const router = express.Router()
router.post("/add-product",productValidation.productCreateValidation,fileUpload.uploadImage.single('image'),productController.addProduct)
router.post("/view-products",productController.viewproducts)
router.post("/view-product",productController.productView)
router.post("/delete-product",productController.deletedProduct)
router.post("/updated-product",fileUpload.uploadImage.single('image'),productController.updatedProduct)
router.post("/product-Search",productController.productSearch)
router.post("/product-status",productController.statusUpdate)



// router.post("/view-product",productController.viewProduct)
// router.post("/search-product",productController.searchProduct)

module.exports = router