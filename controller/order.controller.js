const mongoose = require("mongoose");
const OrderModel = require("../models/order.models");
const { StatusCodes } = require("http-status-codes");
const orderModels = require("../models/order.models");

// Add Order (no quantity)
module.exports.addOrder = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "user_id and product_id are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user_id or product_id.",
      });
    }

    const newOrder = await OrderModel.create({ user_id, product_id });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Order placed successfully!",
      data: newOrder,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// View Orders by User
// module.exports.viewOrders = async (req, res) => {
//   try {
//     const { user_id } = req.params;

//     if (!user_id) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "user_id is required.",
//       });
//     }

//     const orders = await OrderModel.find({ user_id })
//       .populate("user_id")
//       .populate("product_id")
//       .sort({ createdAt: -1 });

//     res.status(StatusCodes.OK).json({
//       success: true,
//       message: "Orders fetched successfully!",
//       data: orders,
//     });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// Delete Order by ID
module.exports.deleteOrder = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid order ID format.",
      });
    }

    const deleted = await OrderModel.findByIdAndDelete(_id);

    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.viewOrders = async (req, res) => {
  try {
    const user_id = req.body
    const users = await OrderModel.find(user_id).populate("user_id").populate("product_id").sort({ createdAt: -1 });
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



// module.exports.OrderSearch = async (req, res) => {
//   try {
//     const { firstName,email } = req.body
//     const user_id = {user_id}
//     if (firstName) {user_id.firstName = { $regex: name, $options: "i" }}
//     if (email) {user_id.email = { $regex: email, $options: "i" }}

//     const searchCat = await orderModels.find(user_id).populate("user_id").populate("product_id").sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       statuscode: StatusCodes.OK,
//       message: "Order found successfully!",
//       data: searchCat
//     })
//   } catch (error) {
//     res.json({
//       success: false,
//       statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
//       message: error.message
//     })
//   }
// }


module.exports.OrderSearch = async (req, res) => {
  try {
    const { firstName, email } = req.body;

    const allOrders = await orderModels
      .find({})
      .populate("user_id")
      .populate("product_id")
      .sort({ createdAt: -1 });

    const filteredOrders = allOrders.filter(order => {
      const user = order.user_id;
      const matchFirstName = firstName
        ? user?.firstName?.toLowerCase().includes(firstName.toLowerCase())
        : true;

      const matchEmail = email
        ? user?.email?.toLowerCase().includes(email.toLowerCase())
        : true;

      return matchFirstName && matchEmail;
    });

    res.json({
      success: true,
      statuscode: StatusCodes.OK,
      message: "Order found successfully!",
      data: filteredOrders,
    });
  } catch (error) {
    res.json({
      success: false,
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};



module.exports.OrderCancel = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid ID Format"
            });
        }

        const deletedItem = await OrderModel.findByIdAndDelete(_id);

        if (!deletedItem) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Order Cancel successfully"
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
        });
    }
};