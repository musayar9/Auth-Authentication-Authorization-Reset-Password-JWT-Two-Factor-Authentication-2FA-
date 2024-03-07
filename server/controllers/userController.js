const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const oneTimePassword = require("../models/oneTimePasswordModel");
const verifyUserCode = require("../utils/verifyUserCode");
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
    const verifyUserOtp = await new oneTimePassword({
      userId: newUser._id,
      token: Math.floor(100000 + Math.random() * 900000).toString(),
    }).save();

    await verifyUserCode(username, surname, email, verifyUserOtp.otp);

    res.status(201).json({
      status: newUser,
      message:
        "Success! User Created, A verification code has been sent to your email.",
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("password login", password);
  if (!email || !password) {
    return next(errorHandler(400, "Please fill form"));
  }

  try {
    const isUser = await User.findOne({ email });
    console.log("isUser", isUser);
    if (!isUser) {
      return next(errorHandler(400, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, isUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET_KEY);

    if (!isUser.verified) {
      // const otpValue = Math.floor(100000 + Math.random() * 900000).toString();

      // isUser.otp = otpValue;
      // yeni eklendi
      const oneTimePass = await new oneTimePassword({
        userId: isUser._id,
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
      }).save();
      console.log("oneTimePass", oneTimePass);
      await isUser.save();
      await sendEmail(isUser.username, isUser.surname, email, oneTimePass.otp);
      // const { password: pass, otp, ...rest } = isUser._doc;
      const { password: pass, ...rest } = isUser._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    } else {
      // const { password: pass, otp, ...rest } = isUser._doc;
      const { password: pass, ...rest } = isUser._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const verifyUserOtp = async (req, res, next) => {
  console.log(req.body);
  const { otp } = req.body;

  const verifyUserOtp = await oneTimePassword.findOne({ otp });
  if (verifyUserOtp?.otp !== otp) {
    return next(errorHandler(400, "Invalid Otp Check Your Email"));
  }

  console.log("verİf", verifyUserOtp);

  try {
    const user = await User.findByIdAndUpdate(
      { _id: verifyUserOtp.userId },

      { $set: { verifyAccount: true } },
      { new: true }
    );
    const { password, ...rest } = user._doc;
    await oneTimePassword.findOneAndDelete({ userId: user._id });
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

const verifyUpdate = async (req, res, next) => {
  const { otp } = req.body;

  // const verifyUser = await User.findOne({ otp });
  const verifyUser = await oneTimePassword.findOne({ otp });

  if (verifyUser?.otp !== otp) {
    return next(errorHandler(400, "Invalid Otp Check Your Email"));
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { verified: true } },
      { new: true }
    );

    // const { password, otp, ...rest } = updateUser._doc;
    const { password, ...rest } = updateUser._doc;
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

const updatedUser = async (req, res, next) => {
  const { username, surname, email } = req.body.formData;
  console.log(req.body);
  const { id } = req.user;
  const { userId } = req.params;

  if (id !== userId) {
    return next(errorHandler(400, "You can't update this user"));
  }

  if (req.body.password) {
    const hashedPassword = bcryptjs.hashSync(req.body.password, 12);
    req.body.password = hashedPassword;
  }

  if (username || surname) {
    if (
      username.length < 3 ||
      surname.length < 3 ||
      username.length > 14 ||
      surname.length > 14
    ) {
      return next(
        errorHandler(400, "Username and Surname must be 3 and 14 characters")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          surname,
          email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

const signOut = async (req, res, next) => {
  const { id } = req.params;

  const isUser = await User.findByIdAndUpdate(
    id,
    {
      $set: { verified: false },
    },
    { new: true }
  );

  await oneTimePassword.findOneAndDelete({ userId: id });

  try {
    res.clearCookie("token").status(200).json({ message: "Sign Out", isUser });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(400, "You can delete only your account"));
  }

  console.log(req.user);

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).clearCookie("token").json("User is Deleted");
  } catch (error) {
    next(error);
  }
};

const deleteVerifyUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params, "req.body");
  const user = await User.findById({ _id: id });
  if (!user) {
    next(errorHandler(400, "User not found"));
  }

  try {
    await User.findByIdAndDelete({ _id: id });
    await oneTimePassword.findOneAndDelete({ userId: id });
    res.status(200).json("User is Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getUsers,
  signin,
  verifyUserOtp,
  verifyUpdate,
  getUser,
  deleteUser,
  signOut,
  updatedUser,
  deleteVerifyUser,
};
