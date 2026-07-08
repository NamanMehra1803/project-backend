const express = require("express")
const contactUsController = require("../controller/contactus.controller")
const fileUpload = require("../middleware/user.middleware")

const router = express.Router()

router.post("/add-contact",fileUpload.uploadImage.single('image'),contactUsController.contactUs)
router.post("/view-contact",fileUpload.uploadImage.single('image'),contactUsController.contactView)
router.post("/delete-contact",contactUsController.contactDeleted)




module.exports = router