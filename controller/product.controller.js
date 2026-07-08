const mongoose = require("mongoose")
const StatusCodes = require("http-status-codes")
const productsModel = require("../models/product.model")




// product add api
module.exports.addProduct = async (req, res) => {
    try {
        const { name, description ,cat_id,price} = req.body;
        const imageName = req.file ? req.file.filename : null;
        // const existingproduct = await productsModel.findOne({ name });
        // if (existinguser) {
        //     return res.status(StatusCodes.CONFLICT).json({
        //         success: false,
        //         message: "Name Already Exists.",
        //     });
        // }
        const productdata = {
            name: name,
            image: imageName,
            description: description,
            cat_id:cat_id,  
            price:price
        }

        const productAdd = await productsModel.create(productdata);

        res.status(StatusCodes.CREATED).json({
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Product added successfully",
            data: productAdd,
        });

    } catch (err) {
        console.error("Error:", err.message);

        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Product addition failed",
            error: err.message,
        });
    }
};


// dashboard view api
module.exports.viewproducts = async(req,res)=>{
    try {
        // const products = await productsModel.find().populate("cat_id")
        const products = await productsModel.find()

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


// product table view api
module.exports.productView = async (req, res) => {
  try {
    const categories = await productsModel.find().populate("cat_id").sort({ createdAt: -1 });

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


// product update api
module.exports.updatedProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log("cat_id received:", req.body.cat_id);


    if (req.file === undefined) {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "Invalid ID Format"
        })
      }
      const productInfo = await productsModel.findOne({ _id: req.body._id })
      if (!productInfo) {
        return res.json({
          success: true,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "Product Doesn't Exist"
        })
      }
      else {

        const updatedata = req.body
        await productsModel.updateOne({ _id }, updatedata)
        res.json({
          success: true,
          statuscode: StatusCodes.OK,
          message: "Product Updated Successfully"
        })
      }

    }

    else {
      const { _id } = req.body
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "Invalid ID Format"
        })
      }
      const proInfo = await productsModel.findOne({ _id: req.body._id })

      if (!proInfo) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "Product Doesn't Exist"
        })
      }
      else {
        const { _id, description,cat_id,price,name} = req.body
        const imageName = req.file.filename;
        const productData = {
          image: imageName,
          description: description,
          cat_id: cat_id,
          price: price,
          name: name,
          image: imageName,
        }
        await productsModel.updateOne({ _id }, productData)
        res.json({
          success: true,
          statuscode: StatusCodes.OK,
          message: "Product Updated Successfully"
        })
      }
    }
  } catch (error) {
    res.json({
      success: false,
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}


// product delete api
module.exports.deletedProduct = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid ID Format"
      });
    }

    const deletedUser = await productsModel.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Product Not Found"
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product Deleted Successfully"

    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      // message: Server error ${error.message}
    });
  }
};



module.exports.productSearch = async (req, res) => {
  try {
    const { name,cat_id } = req.body
    const productData = {}
    if (name) {productData.name = { $regex: name, $options: "i" }}
       if (cat_id) {
      productData.cat_id = cat_id; 
    }

    const searchProduct = await productsModel.find(productData).populate("cat_id").sort({ createdAt: -1 });;
    res.json({
      success: true,
      statuscode: StatusCodes.OK,
      message: "product found successfully!",
      data: searchProduct
    })
  } catch (error) {
    res.json({
      success: false,
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}



module.exports.statusUpdate = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // Find the user
    const product = await productsModel.findById(_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    // Toggle status
    const newStatus = !product.status;
    product.status = newStatus;
    await product.save();
    
    res.status(200).json({
      success: true,
      message: "Status Update Successfully",
      data: product,
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




