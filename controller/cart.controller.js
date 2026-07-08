const express = require("express");
const mongoose = require("mongoose")
const cartModel = require("../models/cart.models");
const StatusCodes = require("http-status-codes")
const orderModels = require("../models/order.models");





// module.exports.addCart = async (req, res) => {
//     try {
//         const { user_id, product_id, quantity } = req.body;
      
//         // validation
//         if (!user_id || !product_id) {
//             return res.status(StatusCodes.BAD_REQUEST).json({
//                 success: false,
//                 message: "user_id and product_id are required.",
//                 statusCode: StatusCodes.BAD_REQUEST,
//             });
//         }
     

//         if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
//             return res.status(StatusCodes.BAD_REQUEST).json({
//                 success: false,
//                 message: "Invalid user_id or product_id",
//                 statusCode: StatusCodes.BAD_REQUEST,
//             });
//         }
//         // check if product already exists in user's cart
//         let existingCartItem = await cartModel.findOne({ user_id, product_id });
//         if (existingCartItem) {
//             // update quantity
//             // existingCartItem.quantity += quantity ? Number(quantity) : 1;
//             // await existingCartItem.save();

//             return res.status(StatusCodes.OK).json({
//                 success: true,
//                 message: " Item already in cart!",
//                 data: existingCartItem,
//                 statusCode: StatusCodes.OK,
//             });
//         }
//         // create new cart item
//         const cartItem = await cartModel.create({
//             user_id,
//             product_id,
//             quantity: quantity ? Number(quantity) : 1,
//         });
//         return res.status(StatusCodes.OK).json({
//             success: true,
//             message: "Item added to cart successfully!",
//             data: cartItem,
//             statusCode: StatusCodes.OK,
//         });
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: error.message,
//             statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//         });
//     }
// };



module.exports.addCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // ================= VALIDATION =================
    if (!user_id || !product_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "user_id and product_id are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user_id or product_id",
      });
    }

    const qty = Number(quantity) || 1;

    // ================= CHECK EXISTING CART =================
    const existingCartItem = await cartModel.findOne({
      user_id,
      product_id,
    });

    // ================= IF EXISTS → UPDATE QTY =================
    if (existingCartItem) {
      const updatedCart = await cartModel.findOneAndUpdate(
        { user_id, product_id },
        { $inc: { quantity: qty } }, // ⭐ SAFE INCREMENT (NO "12" BUG)
        { new: true }
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Cart updated successfully",
        data: updatedCart,
      });
    }

    // ================= CREATE NEW ITEM =================
    const newCartItem = await cartModel.create({
      user_id,
      product_id,
      quantity: qty,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Item added to cart successfully",
      data: newCartItem,
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.viewCart = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      if (!user_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          statuscode: StatusCodes.BAD_REQUEST,
          message: "user_id is required",
        });
      }
  
      const cartItems = await cartModel
        .find({ user_id }) 
        .populate("user_id")
        .populate("product_id");
  
      return res.json({
        success: true,
        statuscode: StatusCodes.OK,
        message: "Cart with user & product fetched successfully!",
        data: cartItems,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  };


module.exports.removeUserCartItems = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid ID Format"
      });
    }

    const deletedUser = await cartModel.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Cart Not Found"
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Cart removed Successfully"

    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
    });
  }
};


