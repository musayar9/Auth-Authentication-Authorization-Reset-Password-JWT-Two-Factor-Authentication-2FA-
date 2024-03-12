const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const PasswordToken = require("../models/resetPasswordToken");
const sendResetPassword = require("../utils/sendResetPassword");
const crypto = require("crypto");

const bcryptjs = require("bcryptjs");

/*Password reset operations based on the incoming email address */
const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email || email === "") {
    return next(errorHandler(401, "Email is Required"));
  }

  // Find user by email address
  const user = await User.findOne({ email });

  // If user not found, return error
  if (!user) {
    return next(errorHandler(401, "User not found"));
  }

  try {
    // create new token
    const token = await new PasswordToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    // Construct password reset URL
    const url = `https://two-factor-authetication-jwt.onrender.com/reset-password/${user._id}/token/${token.token}`;

    // Send password reset email
    await sendResetPassword(user, user.email, url);

    // Send success response
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
  // Get userId and token from request parameters
  const { userId, token } = req.params;

  // Get newPassword and newPasswordConfirm from request body
  const { newPassword, newPasswordConfirm } = req.body;

  // Find the reset token in the database
  const resetToken = await PasswordToken.findOne({ userId, token });

  // If reset token is not found, return an error
  if (!resetToken) {
    return next(errorHandler(401, "The provided token is invalid"));
  }
  // If new password and confirm password do not match, return an error
  if (newPassword !== newPasswordConfirm) {
    return next(errorHandler(400, "Passwords not match check it repeat"));
  }
  // Hash the new password
  const hashedPassword = bcryptjs.hashSync(newPassword, 12);

  try {
    // Update user's password in the database
    const updatePassword = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );
    // Delete the reset token from the database
    await PasswordToken.findOneAndDelete({ token }).exec();

    // Send success response
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
