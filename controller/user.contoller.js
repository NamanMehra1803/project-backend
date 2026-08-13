const mongoose = require("mongoose")
const StatusCodes = require("http-status-codes")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer");


const SITE_URL = process.env.SITE_URL


// register
// module.exports.registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, mobile, password, address } = req.body;
//     if (req.file === undefined) {

//       const userInfo = await userModel.findOne({ email });
//       if (!userInfo) {
//         const saltRounds = 10;
//         const hashPassword = await bcrypt.hash(password, saltRounds);
//         const userData = {
//           firstName: firstName,
//           lastName: lastName,
//           email: email,
//           password: hashPassword,
//           mobile: mobile,
//           role: role,
//           address: address,
//           DOB: DOB
//         }
//         const addUser = await userModel.create(userData);
//         await addUser.save();
//         res.json({
//           success: true,
//           status: StatusCodes.OK,
//           message: "user Register Successfully",
//           data: addUser
//         })
//       } else {
//         res.json({
//           success: false,
//           status: StatusCodes.NOT_FOUND,
//           message: "user already exist",
//         })
//       }
//     }

//     else {
//       const { firstName, lastName, email, password, mobile, role } = req.body;
//       const userInfo = await userModel.findOne({ email });
//       if (!userInfo) {

//         const saltRounds = 10;
//         const hashPassword = await bcrypt.hash(password, saltRounds);
//         const imageName = req.file.filename
//         const userData = {
//           firstName: firstName,
//           lastName: lastName,
//           email: email,
//           password: hashPassword,
//           mobile: mobile,
//           image: imageName,
//           role: role,
//           address: address,
//           DOB: DOB
//         }
//         const addUser = await userModel.create(userData);
//         await addUser.save();
//         res.json({
//           success: true,
//           status: StatusCodes.OK,
//           message: "User Register Successfully!!",
//           data: addUser
//         })
//       } else {
//         res.json({
//           success: false,
//           status: StatusCodes.NOT_FOUND,
//           message: "User already exist",
//         })

//       }
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: true,
//       status: StatusCodes.INTERNAL_SERVER_ERROR,
//       message: `Server Error ${error.message}`
//     })
//   }
// }

module.exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password, address, DOB } = req.body;
    if (req.file === undefined) {
      const userInfo = await userModel.findOne({ email });
      if (!userInfo) {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          mobile: mobile,
          role: role,
          address: address,
          DOB: DOB 
        };
        const addUser = await userModel.create(userData);
        await addUser.save();
        res.json({
          success: true,
          status: StatusCodes.OK,
          message: "User Registered Successfully",
          data: addUser
        });
      } else {
        res.json({
          success: false,
          status: StatusCodes.NOT_FOUND,
          message: "User already exists",
        });
      }
    } else {
      const { firstName, lastName, email, password, mobile, role, address, DOB } = req.body; 
      const userInfo = await userModel.findOne({ email });
      if (!userInfo) {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const imageName = req.file.filename;
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          mobile: mobile,
          image: imageName,
          role: role,
          address: address,
          DOB: DOB
        };
        const addUser = await userModel.create(userData);
        await addUser.save();
        res.json({
          success: true,
          status: StatusCodes.OK,
          message: "User Registered Successfully!",
          data: addUser
        });
      } else {
        res.json({
          success: false,
          status: StatusCodes.NOT_FOUND,
          message: "User already exists",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: `Server Error ${error.message}`
    });
  }
};


//login
module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const userInfo = await userModel.findOne({ email: email })
    if (!userInfo) {
      res.json({
        message: "Email Not Found",
        success: false,
        status: StatusCodes.NOT_FOUND
      })
    }

    if (userInfo.role !== 1) {
      return res.json({
        message: "You are not admin.",
        success: false,
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const validPassword = await bcrypt.compare(password, userInfo.password)
    if (!validPassword) {
      res.json({
        message: "incorrect password",
        success: false,
        status: StatusCodes.NOT_FOUND
      })
    }
    const secretKeys = "dfghjkjhgfd"
    const token = await jwt.sign({ _id: userInfo._id }, secretKeys, { expiresIn: '1h' })
    res.json({
      success: true,
      message: "User login successfully",
      data: userInfo,
      token: token,
      status: StatusCodes.OK
    })

  } catch (error) {
    res.json({
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}


module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const userInfo = await userModel.findOne({ email: email })
    if (!userInfo) {
      res.json({
        message: "Email Not Found",
        success: false,
        status: StatusCodes.NOT_FOUND
      })
    }

    if (userInfo.status !== true) {
      return res.json({
        message: "Your Account is Deactivated.",
        success: false,
        status: StatusCodes.UNAUTHORIZED,
      });
    }
    const validPassword = await bcrypt.compare(password, userInfo.password)
    if (!validPassword) {
      res.json({
        message: "incorrect password",
        success: false,
        status: StatusCodes.NOT_FOUND
      })
    }
    const secretKeys = "dfghjkjhgfd"
    const token = await jwt.sign({ _id: userInfo._id }, secretKeys, { expiresIn: '1h' })
    res.json({
      success: true,
      message: "User login successfully",
      data: userInfo,
      token: token,
      status: StatusCodes.OK
    })

  } catch (error) {
   return  res.json({
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
};


//adduser
module.exports.addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, DOB, role, address,password } = req.body;
    const imageName = req.file ? req.file.filename : null;
      const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(req.body); // All fields
    console.log(req.file);
    // const imageName = req.file.filename
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "User already exists.",
      });
    }
    const userdata = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
            password: hashPassword,

      DOB: DOB,
      image: imageName,
      role: role,
      address: address

    }

    const userAdd = await userModel.create(userdata);
    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User added successfully",
      data: userAdd,
    });

  } catch (err) {
    // console.error("Error:", err.message);

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "User addition failed",
      error: err.message,
    });
  }
};

//viewAll
module.exports.viewAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "All users fetched successfully!",
      data: users,
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching users",
    });
  }
};


//updateUser1
module.exports.updatedUser = async (req, res) => {
  try {
    const { _id } = req.body;
        console.log("qqqqqq",_id)


    if (req.file === undefined) {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "Invalid ID Format"
        })
      }
      const userInfo = await userModel.findOne({ _id: req.body._id })
      if (!userInfo) {
        return res.json({
          success: true,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "user doesn't exists"
        })
      }
      else {

        const updatedata = req.body
        await userModel.updateOne({ _id }, updatedata)
        res.json({
          success: true,
          statuscode: StatusCodes.OK,
          message: "user updated successfully"
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
      const usersInfo = await userModel.findOne({ _id: req.body._id })

      if (!usersInfo) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "user doesn't exists"
        })
      }
      else {
        const { _id, firstName, lastName, email, DOB, mobile, address, role } = req.body
        const imageName = req.file.filename;
        const userData = {
          image: imageName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          DOB: DOB,
          mobile: mobile,
          address: address,
          role: role

        }
        await userModel.updateOne({ _id }, userData)
        res.json({
          success: true,
          statuscode: StatusCodes.OK,
          message: "user updated successfully"
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


//searchUser
module.exports.searchUser = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user,
    });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//statusUpdate
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
    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Toggle status
    const newStatus = !user.status;
    user.status = newStatus;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Status Update Successfully",
      data: user,
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


//deleteUser
module.exports.deleteduser = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid ID Format"
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User permanently deleted"
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      // message: Server error ${error.message}
    });
  }
};


// change password
module.exports.changePassword = async (req, res) => {
  try {
    const { _id, currentPassword, newPassword } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.json({
        success: false,
        statusCode: statusCodes.NON_AUTHORITATIVE_INFORMATION,
        message: "Invalid ID format",
      });
    }
    const studentInfo = await studentModel.findOne({ _id })
    if (!studentInfo) {
      return res.json({
        success: false,
        statusCode: statusCodes.NOT_FOUND,
        message: "Student does not exist.",
      });
    } else {
      const validPassword = await bcrypt.compare(currentPassword, studentInfo.password);
      if (!validPassword) {
        return res.json({
          success: false,
          statusCode: statusCodes.NOT_MODIFIED,
          message: "password not matched.",
        });
      } else {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(newPassword, saltRounds);
        const updateStudent = await studentModel.updateOne({ _id }, { password: hashPassword, updatedAt: new Date() });
        return res.json({
          success: true,
          statusCode: statusCodes.OK,
          message: "Your password is changed successfully."
        })
      }
    }
  } catch (err) {
    res.json({
      success: false,
      statusCode: statusCodes.BAD_REQUEST,
      // message: Server Error ${err.message}
    })
  }
}


// View profile
module.exports.getProfile = async (req, res) => {
  try {
    // console.log("hello",`${SITE_URL}/uploads`)
    const id = req.body._id;
    const student = await userModel.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    //  console.log("-----------",student.image)

    const user_image = student.image;
    const SITEURL = `${SITE_URL}/uploads/${user_image}`
    const userData = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      DOB: student.DOB,
      address: student.address,
      mobile: student.mobile,


      image: SITEURL
    }
    res.status(200).json({
      success: true,
      message: "User Profile fetch successfully!",
      data: userData,
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: `server error`
    })
  }
};

// Frontend user getprofile
module.exports.usergetProfile = async (req, res) => {
  try {
    // console.log("hello",`${SITE_URL}/uploads`)
    const id = req.body._id;
    const users = await userModel.findById(id);
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    //  console.log("-----------",users.image)

    const user_image = users.image;
    const SITEURL = `${SITE_URL}/uploads/${user_image}`
    const userData = {
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      mobile: users.mobile,
      DOB: users.DOB,
      address: users.address,
      image: SITEURL
    }
    res.status(200).json({
      success: true,
      message: "User Profile fetch successfully!",
      data: userData,
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: `server error`
    })
  }
};



module.exports.usersView = async (req, res) => {
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


module.exports.userSearch = async (req, res) => {
  try {
    const { firstName, email } = req.body
    const userData = { role: 2 }
    if (firstName) { userData.firstName = { $regex: firstName, $options: "i" } }
    if (email) { userData.email = { $regex: email, $options: "i" } }
    const searchUser = await userModel.find(userData);
    res.json({
      success: true,
      statuscode: StatusCodes.OK,
      message: "user found successfully!",
      data: searchUser
    })
  } catch (error) {
    res.json({
      success: false,
      statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    })
  }
}



module.exports.profileUpdate = async (req, res) => {
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
      const userInfo = await userModel.findOne({ _id: req.body._id })
      if (!userInfo) {
        return res.json({
          success: true,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "profile doesn't exists"
        })
      }
      else {

        const updatedata = req.body
        await userModel.updateOne({ _id }, updatedata)
        res.json({
          success: true,
          statuscode: StatusCodes.OK,
          message: "profile updated successfully"
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
      const usersInfo = await userModel.findOne({ _id: req.body._id })

      if (!usersInfo) {
        return res.json({
          success: false,
          statuscode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
          message: "profile doesn't exists"
        })
      }
      else {
        const { _id, firstName, lastName, email, DOB, mobile, address, role } = req.body
        const imageName = req.file.filename;
        const userData = {
          image: imageName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          DOB: DOB,
          mobile: mobile,
          address: address,
          role: role

        }
        await userModel.updateOne({ _id }, userData)
        res.json({
          success: true,
          statuscode: StatusCodes.OK,
          message: "profile updated successfully"
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



