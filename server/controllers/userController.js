const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  const user = await User.find({});
  try {
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  const { username, surname, email, password } = req.body.formData;
  console.log(req.body);
  if (!username || !surname || !email || !password) {
    return next(errorHandler(401, "Please fill full form!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({
    username,
    surname,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ status: newUser, message: "Success! User Created" });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "Please fill form"));
  }

  try {
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return next(errorHandler(400, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, isUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET_KEY);

    if (!isUser.verified) {
      const otpValue = Math.floor(100000 + Math.random() * 900000).toString();

      isUser.otp = otpValue;

      await isUser.save();
      await sendEmail(email, otpValue);
      const { password: pass, otp, ...rest } = isUser._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    } else {
      const { password: pass, otp, ...rest } = isUser._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  const verifyUser = await User.findOne({ otp });
  try {
    if (verifyUser) {
      verifyUser.verified = true;
      await verifyUser.save();
      res
        .status(200)
        .json({ message: "User Verified Successfully", verifyUser });
    } else {
      return next(errorHandler(400, "Invalid Otp Check Your Email"));
    }
  } catch (err) {
    next(err);
  }
};

const verifyUpdate = async (req, res, next) => {
  const { otp } = req.body;

  const verifyUser = await User.findOne({ otp });

  if (verifyUser?.otp !== otp) {
    return next(errorHandler(400, "Invalid Otp Check Your Email"));
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { verified: true } },
      { new: true }
    );

    const { password, otp, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User Nor Found"));
    }
    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json("Sign Outed ");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  // console.log("user", req.user);
  if (req.user.id !== req.params.id) {
    return next(errorHandler(400, "You can delete only your account"));
  }


  console.log(req.user)
  // const isUser = await User.findOne({id});
  // if (!isUser) {
  //   return next(errorHandler(400, "User is Not Found"));
  // }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User is Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getUsers,
  signin,
  verifyOtp,
  verifyUpdate,
  getUser,
  deleteUser,
  signOut,
};
