const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const PasswordToken = require("../models/resetPasswordToken");
const sendResetPassword = require("../utils/sendResetPassword");
const crypto = require("crypto");
const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "") {
    return next(errorHandler(401, "Email is Required"));
  }

  const user = await User.findOne({ email });
  console.log(user, "username");
  if (user.email !== email) {
    return next(errorHandler(401, "User not found"));
  }

  try {
    const token = await new PasswordToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    console.log("toek", token);
    const url = `http://localhost:5173/reset-password/${user._id}/token/${token.token}`;
    await sendResetPassword(user, user.email, url);

    res.status(200).json("send resetPassword Token");
  } catch (err) {
    next(err);
  }
};

module.exports = { resetPassword };
