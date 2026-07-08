const express = require("express")
const userValidation = require("../validations/user.validation")
const userController = require("../controller/user.contoller")
const fileUpload = require("../middleware/user.middleware")

const router = express.Router()
router.post("/api/admin/register",fileUpload.uploadImage.single('image'),userValidation.userCreateValidation,userController.registerUser)
router.post("/api/admin/login", userController.adminLogin)
router.post("/api/user/login", userController.userLogin)
router.post("/api/admin/addUser", fileUpload.uploadImage.single('image'), userValidation.userAddValidation,userController.addUser);
router.get("/api/admin/users", userController.viewAllUsers);
router.post("/api/user/update",fileUpload.uploadImage.single('image'),userController.updatedUser);
router.post("/api/admin/searchUser",userController.searchUser);
router.post("/api/admin/statusUpdate",userController.statusUpdate);
router.post("/api/admin/userdelete",userController.deleteduser);
router.post("/api/admin/my-profile",userController.getProfile)
router.post("/api/user/my-profile",userController.usergetProfile)
router.post("/userview",userController.usersView);
router.post("/userSearch",userController.userSearch);
router.post("/statusUpdate",userController.statusUpdate);
router.post("/api/admin/profileUpdate",fileUpload.uploadImage.single('image'),userController.profileUpdate);


module.exports = router