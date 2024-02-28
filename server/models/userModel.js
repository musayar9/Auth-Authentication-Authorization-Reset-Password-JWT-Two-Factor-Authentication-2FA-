const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [2, "Username must contain at least 3 Characters!"],
    },
    surname: {
      type: String,
      required: true,
      minLength: [2, "Surname must contain at least 3 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain at least 6 characters"],
      maxLength: [14, "Password cannot exceed 14"],
    },
    otp: String,
    verified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
