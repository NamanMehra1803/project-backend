const mongoose = require("mongoose")
const StatusCodes = require("http-status-codes")
const categoryModel = require("../models/category.model")
const productModel = require("../models/product.model")

const SITE_URL = process.env.SITE_URL


module.exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const imageName = req.file ? req.file.filename : null;
        const existinguser = await categoryModel.findOne({ name });
        if (existinguser) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "Category Already Exists.",
            });
        }
        const categorydata = {
            name: name,
            image: imageName,
            description: description,
        }

        const categoryAdd = await categoryModel.create(categorydata);

        res.status(StatusCodes.CREATED).json({
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Category added successfully",
            data: categoryAdd,
        });

    } catch (err) {
        // console.error("Error:", err.message);

        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Category addition failed",
            error: err.message,
        });
    }
};

//findall
module.exports.viewCategories = async (req , res) => {
    try {
        const category = await categoryModel.find().sort({ createdAt: -1 });

        res.status(StatusCodes.OK).json({
            success: true,
            statuscode: StatusCodes.OK,
            message: "Categories viewed successfully!",
            data: category,
        });

    } catch (error) {
        // console.error("Error fetching categories:", error.message);

        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            statuscode: StatusCodes.BAD_REQUEST,
            message: "Categories fetch error",
            error: error.message, // helpful for debugging
        });
    }
};


//update
module.exports.updatedCategory = async (req, res) => {
    try {
        const { _id } = req.body;

        if (req.file === undefined) {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return res.json({
                    success: false,
                    statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                    message: "Invalid ID Format"
                })
            }
            const CategoryInfo = await categoryModel.findOne({ _id: req.body._id })
            if (!CategoryInfo) {
                return res.json({
                    success: true,
                    statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                    message: "category doesn't exists"
                })
            }
            else {

                const updatedata = req.body
                // console.log("updateData",updatedata)
                await categoryModel.updateOne({ _id }, updatedata)
                res.json({
                    success: true,
                    statuscode: StatusCodes.OK,
                    message: "Category Updated Successfully"
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
            const categoryInfo = await categoryModel.findOne({ _id: req.body._id })

            if (!categoryInfo) {
                return res.json({
                    success: false,
                    statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                    message: "Category Doesn't Exist"
                })
            }
            else {
                const { _id, name, description } = req.body
                const imageName = req.file.filename;
                const categoryData = {
                    image: imageName,
                    name: name,
                    description: description,
                }
                // console.log("updateData",updatedata)
                await categoryModel.updateOne({ _id }, categoryData)
                res.json({
                    success: true,
                    statuscode: StatusCodes.OK,
                    message: "Category Updated Successfully"
                })
            }
        }
    } catch (error) {
        res.json({
            success: false,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
            // message: Server error : ${error.message}
        })
    }
}



// delte
module.exports.deletedCategory = async (req, res) => {
    try {
        const { _id } = req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.json({
                success: false,
                statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                message: "Invalid ID format",
            })
        }
        const categoryInfo = await categoryModel.findOne({ _id })
        if (!categoryInfo) {
            return res.json({
                success: true,
                statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                message: "Category Doesn't Exist"
            })
        }
        else {
            await categoryModel.deleteOne({ _id })
            res.json({
                success: true,
                statuscode: StatusCodes.OK,
                message: "Category Deleted Successfully!"
            })
        }
    } catch (error) {
        res.json({
            success: false,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
            // message :Server Error : ${error.message}
        })
    }
}



module.exports.categoryView = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "All Categories Fetched Successfully",
      status: StatusCodes.OK,
      data: categories,
    });

  } catch (err) {
    // console.error("Error:", err.message);
    res.json({
      success: false,
      message: "Error Fetching Categories",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};



// view all category selector-------------
module.exports.categoryViewAll = async (req, res) => {
  try {
    const categories = await categoryModel.find({status:true}).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All categories fetched successfully!",
      status: StatusCodes.OK,
      data: categories,
    });

  } catch (err) {
    // console.error("Error:", err.message);
    res.json({
      success: false,
      message: "Error fetching categories",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};


module.exports.catSearch = async (req, res) => {
  try {
    const { name } = req.body
    const catData = {}
    if (name) {catData.name = { $regex: name, $options: "i" }}
    const searchCat = await categoryModel.find(catData).sort({ createdAt: -1 });;
    res.json({
      success: true,
      statuscode: StatusCodes.OK,
      message: "category found successfully!",
      data: searchCat
    })
  } catch (error) {
    res.json({
      success: false,
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}


// module.exports.statusUpdate = async (req, res) => {
//   try {
//     const { _id } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid ID format",
//       });
//     }

//     // Find the user
//     const category = await categoryModel.findById(_id);
//     if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "category not found",
//       });
//     }

//     // Toggle status
//     const newStatus = !category.status;
//     category.status = newStatus;
//     await category.save();
    
//     res.status(200).json({
//       success: true,
//       message: "Status Update Successfully",
//       data: category,
//     });

//   } catch (error) {
//     // console.error("Error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// status update with status update

module.exports.statusUpdate = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // Find the category
    const category = await categoryModel.findById(_id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Toggle category status
    const newCategoryStatus = !category.status;
    category.status = newCategoryStatus;
    await category.save();

    // Update status of products that belong to this category
    const updatedProducts = await productModel.updateMany(
      { cat_id: category._id }, // Check for matching category ID
      { status: newCategoryStatus } // Update product status to the new category status
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully for category and related products",
      data: { category, updatedProducts },
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
module.exports.statusUpdate = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // Find the category
    const category = await categoryModel.findById(_id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Toggle category status
    const newCategoryStatus = !category.status;
    category.status = newCategoryStatus;
    await category.save();

    // Update status of products that belong to this category
    const updatedProducts = await productModel.updateMany(
      { cat_id: category._id }, // Check for matching category ID
      { status: newCategoryStatus } // Update product status to the new category status
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully for category and related products",
      data: { category, updatedProducts },
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



