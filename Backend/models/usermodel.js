import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  profilePic: { type: String, default: "" },
  profilePicPublicId: { type: String, default: "" },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, enum: ["user", "admin"], default: "user" },

  token: String,
  isVerified: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },

  otp: String,
  otpExpiry: Date,

  address: String,
  city: String,
  zipCode: Number,
  phoneNo: Number
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
