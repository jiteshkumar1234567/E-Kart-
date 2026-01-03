
import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

// export const isAuthenticated = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "No token" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const user = await User.findById(decoded.id).select("_id role");
//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     req.id = user._id;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Auth failed" });
//   }
// };


export const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // ✅ 1️⃣ COOKIE se token (Render / Browser)
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    // ✅ 2️⃣ HEADER se token (Postman / Mobile)
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select("_id role email");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    req.id = user._id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access Denied - Admins Only",
    });
  }
};

