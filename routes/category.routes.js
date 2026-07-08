const express = require("express")
const categoryController = require("../controller/category.controller")
const categoryValidation = require("../validations/category.validation")
const fileUpload = require("../middleware/user.middleware")

const router = express.Router()
router.post("/add-category",fileUpload.uploadImage.single('image'),categoryValidation.categoryCreateValidation,categoryController.addCategory)
router.get("/view-categories",categoryController.viewCategories)
router.post("/update-category",fileUpload.uploadImage.single('image'),categoryController.updatedCategory);
router.post("/view-category",categoryController.categoryView);
router.post("/view-categoryes",categoryController.categoryViewAll);
router.post("/delete-category",categoryController.deletedCategory);
router.post("/serach-category",categoryController.catSearch);
router.post("/category-status",categoryController.statusUpdate);



module.exports = router 