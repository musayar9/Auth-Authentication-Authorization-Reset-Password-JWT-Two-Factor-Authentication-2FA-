const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const PasswordToken = require("../models/resetPasswordToken");
const sendResetPassword = require("../utils/sendResetPassword");
const crypto = require("crypto");

const bcryptjs = require("bcryptjs");
const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "") {
    return next(errorHandler(401, "Email is Required"));
  }

  const user = await User.findOne({ email });
  console.log(user, "username");
  if (!user) {
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

    res.status(200).json({
      message: "Check your email address. Password change url sent",
      status: { token },
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
};

const changePasswordGet = async (req, res, next) => {
  const { userId, token } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    const resetToken = await PasswordToken.findOne({ userId, token });

    if (!resetToken) {
      return next(errorHandler(400, "The provided token is invalid"));
    }

    res.status(200).json({ message: "Change Password" });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  console.log(req.params, "req.parmas");
  console.log(req.body, "req.body");

  const { userId, token } = req.params;
  const { newPassword, newPasswordConfirm } = req.body;

  const resetToken = await PasswordToken.findOne({ userId, token });

  if (!resetToken) {
    return next(errorHandler(401, "The provided token is invalid"));
  }

  if (newPassword !== newPasswordConfirm) {
    return next(errorHandler(400, "Passwords not match check it repeat"));
  }

  // const user = await User.findById(userId);

  const hashedPassword = bcryptjs.hashSync(newPassword, 12);

  try {
    const updatePassword = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );

    // user.password = newPassword;
    // await user.save();
    await PasswordToken.findOneAndDelete({ token }).exec();
    res.status(200).json({
      statusCode: 200,
      message: "password change success",
      updatePassword,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetPassword, changePassword, changePasswordGet };
