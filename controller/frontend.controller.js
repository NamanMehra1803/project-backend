const mongoose = require("mongoose")
const StatusCodes = require("http-status-codes")
const categoryModel = require("../models/category.model")
const productsModel = require("../models/product.model")
const orderModel = require("../models/order.models")

//find 8 category with status ture
module.exports.viewCategories = async(req,res)=>{
    try {
        const category = await categoryModel.find({status:true}).sort({createdAt:-1}).limit(8)
        res.json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Categories viewed Successfully!",
            data: category
        })
    } catch (error) {
        res.json({
            success: false,
            statuscode: StatusCodes.BAD_REQUEST,
            message: "Categories fetch error" 
        })
        
    }
}

//find 8 products with status true 
module.exports.viewproducts = async(req,res)=>{
    try {
        const category = await productsModel.find({status:true}).sort({createdAt:-1}).limit(8)
        res.json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Categories viewed Successfully!",
            data: category
        })
    } catch (error) {
        res.json({
            success: false,
            statuscode: StatusCodes.BAD_REQUEST,
            message: "Categories fetch error" 
        })
        
    }
}


//findall category
module.exports.viewallCategories = async(req,res)=>{
    try {
        const category = await categoryModel.find({status:true})
        res.json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Categories viewed Successfully!",
            data: category
        })
    } catch (error) {
        res.json({
            success: false,
            statuscode: StatusCodes.BAD_REQUEST,
            message: "Categories fetch error" 
        })
        
    }
}


//findall product with category
module.exports.viewAllproducts = async(req,res)=>{
    try {
          
        const products = await productsModel.find({status:true}).populate("cat_id")
        res.json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Products viewed Successfully!",
            data: products
        })
    } catch (error) {
        res.json({
            success: false,
            statuscode: StatusCodes.BAD_REQUEST,
            message: "products fetch error" 
        })
        
    }
}


//find product by _id 
module.exports.viewProductById = async (req, res) => {
    try {
      const { _id } = req.body;
  
      if (!_id) {
        return res.json({
          success: false,
          statuscode: StatusCodes.BAD_REQUEST,
          message: "Product ID is required"
        });
      }
  
      const product = await productsModel.findById(_id);
  
      if (!product) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NOT_FOUND,
          message: "Product not found"
        });
      }
  
      res.json({
        success: true,
        statuscode: StatusCodes.OK,
        message: "Product fetched successfully!",
        data: product
      });
    } catch (error) {
      res.json({
        success: false,
        statuscode: StatusCodes.BAD_REQUEST,
        message: "Error fetching product"
      });
    }
  };




//find product by cat_id 
module.exports.viewProductBycatId = async (req, res) => {
  try {
    const { cat_id } = req.body;

    if (!cat_id) {
      return res.json({
        success: false,
        statuscode: StatusCodes.BAD_REQUEST,
        message: "Category ID is required"
      });
    }

    const products = await productsModel.find({ cat_id,status:true }).sort({createdAt:-1});

    if (!products || products.length === 0) {
      return res.json({
        success: false,
        statuscode: StatusCodes.NOT_FOUND,
        message: "No products found for this category"
      });
    }

    res.json({
      success: true,
      statuscode: StatusCodes.OK,
      message: "Products fetched successfully!",
      data: products
    });
  } catch (error) {
    res.json({
      success: false,
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error fetching products"
    });
  }
};




module.exports.FrontOrder = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                statuscode: StatusCodes.BAD_REQUEST,
                message: "user_id is required",
            });
        }

        const wishlistItems = await orderModel
            .find({ user_id })
            .populate("user_id")
            .populate("product_id");

        return res.json({
            success: true,
            statuscode: StatusCodes.OK,
            message: " user & product fetched successfully!",
            data: wishlistItems,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};
