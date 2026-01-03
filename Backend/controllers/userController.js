import bcrypt from "bcryptjs";
import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionmodel.js";
import { sendOTPMail } from "../emailVerify/sendotpmail.js";
import cloudinary from "../Utils/Cloudinary.js";



export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    verifyEmail(token, email); //send email here
    newUser.token = token;

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email); // send mail
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "verification email sent again successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

                    //UPDATED LOGIN WITH COOKIES AND SESSIONS
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User not Exists",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      exisitingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (exisitingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Verify your account then login",
      });
    }

    // 🔐 TOKEN GENERATE
    const accessToken = jwt.sign(
      { id: exisitingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );

    const refreshToken = jwt.sign(
      { id: exisitingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    exisitingUser.isLoggedIn = true;
    await exisitingUser.save();

    // 🔁 SESSION
    await Session.deleteOne({ userId: exisitingUser._id });
    await Session.create({ userId: exisitingUser._id });

    // 🍪 COOKIES (🔥 MOST IMPORTANT)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,      // Render HTTPS
      sameSite: "none",  // cross-site
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // ✅ FINAL RESPONSE
    return res.status(200).json({
      success: true,
      message: `Welcome Back ${exisitingUser.firstName}`,
      user: exisitingUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     const exisitingUser = await User.findOne({ email });
//     if (!exisitingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User not Exists",
//       });
//     }
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       exisitingUser.password
//     );
//     if (!isPasswordValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Password",
//       });
//     }
//     if (exisitingUser.isVerified === false) {
//       return res.status(400).json({
//         success: false,
//         message: "Verify your account then login",
//       });
//     }

//     // generate token

//     const accessToken = jwt.sign(
//       { id: exisitingUser._id },
//       process.env.SECRET_KEY,
//       { expiresIn: "10d" }
//     );
//     const refreshToken = jwt.sign(
//       { id: exisitingUser._id },
//       process.env.SECRET_KEY,
//       { expiresIn: "30d" }
//     );

//     exisitingUser.isLoggedIn = true;
//     await exisitingUser.save();

//     // check for existing session or delete
//     const exisitingSession = await Session.findOne({
//       userId: exisitingUser._id,
//     });
//     if (exisitingSession) {
//       await Session.deleteOne({ userId: exisitingUser._id });
//     }

//     // create new session
//     await Session.create({ userId: exisitingUser._id });
//     return res.status(200).json({
//       success: true,
//       message: `Welcome Back ${exisitingUser.firstName}`,
//       user: exisitingUser,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

                          

export const logout = async (req, res) => {
  try {
    const userId = req.id;
    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sendOTPMail(otp, email);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //kaam aaye to dekh lena

    // if (!user.otp || !user.otpExpiry) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "OTP not generated"
    //   });
    // }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Plz check confirmPassword Password does not match",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // optional but recommended
    if (user.otp || user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; //extract userid form params
    const user = await User.findById(userId).select(
      "-password -otp -otpExpiry -token"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET LOGGED-IN USER (for refresh)
export const getMe = async (req, res) => {
  try {
    const userId = req.id; // coming from isAuthenticated middleware

    const user = await User.findById(userId).select(
      "-password -otp -otpExpiry -token"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const updateUser = async (req, res) => { 
//   try {
//     const userIdToUpdate = req.params.id; // the id of the user we want to update
//     const loggedInUser = req.user; //from is authenticated middleware
//     const { firstName, lastName, address, city, zipCode, phoneNo, role } =
//       req.body;

//     if (
//       loggedInUser._id.toString() !== userIdToUpdate &&
//       loggedInUser.role !== "admin"
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "You Are Not Allow To Update Profile",
//       });
//     }

//     let user = await user.findById(userIdToUpdate);
//     if (!user) {
//       return res.status(403).json({
//         success: false,
//         message: "user not found",
//       });
//     }

//     let profilePicUrl = user.profilePic;
//     let profilePicPublicId = user.profilePicPublicId;

//     // if new file is uploaded
//     if (req.file) {
//       if (profilePicPublicId) {
//         await cloudinary.uploader.destroy(profilePicPublicId);
//       }
//       const uploadResult = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "profiles" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         stream.end(req.file.buffer);
//       });
//       profilePicUrl = uploadResult.secure_url;
//       profilePicPublicId = uploadResult.public_id;
//     }

//     //update fields
//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.address = address || user.address;
//     user.city = city || user.city;
//     user.zipCode = zipCode || user.zipCode;
//     user.phoneNo = phoneNo || user.phoneNo;
//     user.role = role;
//     user.profilePic = profilePicUrl;
//     user.profilePicPublicId = profilePicPublicId;

//     const updatedUser = await user.save();
//     return res.status(200).json({
//       success: true,
//       message: "Profile Updated Successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ FIX: ObjectId → string
    if (req.id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update profile",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { firstName, lastName, address, city, zipCode, phoneNo } = req.body;

    // ✅ IMAGE UPLOAD
    if (req.file) {
      if (user.profilePicPublicId) {
        await cloudinary.uploader.destroy(user.profilePicPublicId);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      user.profilePic = uploadResult.secure_url;
      user.profilePicPublicId = uploadResult.public_id;
    }

    // ✅ SAFE UPDATE
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phoneNo = phoneNo || user.phoneNo;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
