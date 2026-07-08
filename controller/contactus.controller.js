const StatusCodes = require('http-status-codes');
const ContactModel = require('../models/contactus.models'); 
const mongoose = require("mongoose");

// Message Sent Api
module.exports.contactUs = async (req, res) => {
    try {
        const { name, email ,message,address,phone} = req.body;
        const imageName = req.file ? req.file.filename : null;
        const existinguser = await ContactModel.findOne({ email });
        if (existinguser) {
            return res.status(StatusCodes.CONFLICT).json({
                success: false,
                message: "Your Message Already Sent",
            });
        }
        const productdata = {
            name: name,
            image: imageName,
            email: email,
            message:message,  
            address:address,
            phone:phone
        }

        const productAdd = await ContactModel.create(productdata);

        res.status(StatusCodes.CREATED).json({
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Message Sent successfully",
            data: productAdd,
        });

    } catch (err) {
        console.error("Error:", err.message);

        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Message addition failed",
            error: err.message,
        });
    }
};


module.exports.contactView = async (req, res) => {
  try {
    const contactUs = await ContactModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "All contact fetched successfully!",
      status: StatusCodes.OK,
      data: contactUs,
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.json({
      success: false,
      message: "Error fetching contactUs",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};


module.exports.contactDeleted = async (req, res) => {
    try {
        const { _id } = req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.json({
                success: false,
                statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                message: "Invalid ID format",
            })
        }
        const categoryInfo = await ContactModel.findOne({ _id })
        if (!categoryInfo) {
            return res.json({
                success: true,
                statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                message: "Contact Doesn't Exist"
            })
        }
        else {
            await ContactModel.deleteOne({ _id })
            res.json({
                success: true,
                statuscode: StatusCodes.OK,
                message: "Contact Deleted Successfully!"
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