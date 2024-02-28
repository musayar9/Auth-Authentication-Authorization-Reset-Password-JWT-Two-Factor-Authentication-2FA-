const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken")

const getUsers = async (req, res, next) => {
  const user = await User.find({});
  try {
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  const { username, surname, email, password } = req.body;

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
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      isUser.otp = otp;
      await isUser.save();
      await sendEmail(email, otp);
      return res.status(200).cookie("access_token", token, { httpOnly: true }).json(isUser);
    } else {
      const { password: pass, ...rest } = isUser._doc;
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, getUsers, signin };
