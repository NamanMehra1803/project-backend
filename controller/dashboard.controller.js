const mongoose = require("mongoose")
const StatusCodes = require("http-status-codes")
const categoryModel = require("../models/category.model")
const productModel = require("../models/product.model")
const userModel = require("../models/user.model")

// product view dashboard api 
module.exports.productViewdashboard = async (req, res) => {
  try {
    const categories = await productModel.find({status:true}).populate("cat_id").sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "All product fetched successfully!",
      status: StatusCodes.OK,
      data: categories,
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.json({
      success: false,
      message: "Error fetching categories",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};


module.exports.userViewdashboard = async (req, res) => {
  try {
    const users = await userModel.find({ role: 2 }).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All users fetched successfully!",
      status: StatusCodes.OK,
      data: users,
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.json({
      success: false,
      message: "Error fetching users",
      status: StatusCodes.INTERNAL_SERVER_ERROR
    });
  }
};

//  user view dashboard api
module.exports.categoryViewdashboard = async (req, res) => {
  try {
    const categories = await categoryModel.find({status:true}).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All categories fetched successfully!",
      status: StatusCodes.OK,
      data: categories,
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.json({
      success: false,
      message: "Error fetching categories",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

