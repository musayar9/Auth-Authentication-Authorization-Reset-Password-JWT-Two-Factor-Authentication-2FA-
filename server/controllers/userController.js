const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const oneTimePassword = require("../models/oneTimePasswordModel");
const verifyUserCode = require("../utils/verifyUserCode");
const crypto = require("crypto");
const getUsers = async (req, res, next) => {
  const user = await User.find({});
  try {
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// register to the site
const signup = async (req, res, next) => {
  const { username, surname, email, password } = req.body.formData;

  if (!username || !surname || !email || !password) {
    return next(errorHandler(401, "Please fill full form!"));
  }

  /*After the form checks are completed, we hash the password using bcryptjs.
  We use bcryptjs to store passwords securely
  */
  const hashedPassword = bcryptjs.hashSync(password, 12);

  /*Here we create a new user using the user model */
  const newUser = new User({
    username,
    surname,
    email,
    password: hashedPassword,
  });

  try {
    /*we saved newuser */
    await newUser.save();

    /*Here we generate a user-specific disposable 6-digit verification code for user verification.
    We send this generated verification code to the e-mail address used by the user when registering using nodemailer. */
    const verifyUserOtp = await new oneTimePassword({
      userId: newUser._id,
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
    }).save();

    await verifyUserCode(username, surname, email, verifyUserOtp.otp);

    /*If all operations are successful, we return the success message and user information as a response. */
    res.status(201).json({
      status: newUser,
      message:
        "Success! User Created, A verification code has been sent to your email.",
    });
  } catch (err) {
    next(err);
  }
};

// github and google authentication

/*Here are the user registration and login procedures via Github and Google platforms. */
const oauth = async (req, res, next) => {
  const { username, surname, email, profilePicture } = req.body.formData;

  try {
    /* Here, a filtering process is performed through the user model based on the email data coming from the body. 
    If there is a user with the relevant email address, the user will be able to log in to the page, 
    if not, the user will be registered to the site.*/
    const user = await User.findOne({ email });

    if (user) {
      /*If there is a user, we use jsonwebtoken to create the content of jsonwebtoken with the user id.
      Represents the key required for signing jsonwebtoken in jwt_secret_key */
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      /*Here we generate a 6-digit code for two-factor authentication. 
      This single-use code will be sent to the user's email address during each login process. */
      const oneTimePass = await new oneTimePassword({
        userId: user._id,
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
      }).save();
      await sendEmail(username, surname, email, oneTimePass.otp);

      /*Here, the password field is removed from the user. 
      The remaining user information is transferred to the rest variable.
      This way the user password is not sent to the client. */
      const { password, ...rest } = user._doc;

      /*The statement .cookie("token", token, { httpOnly: true }) adds a cookie to the HTTP response.
      This cookie is typically used to manage user sessions or store authentication information.
      In this case, the generated JWT token is added as a cookie. The { httpOnly: true } option makes the cookie inaccessible to JavaScript, which increases security.
      We determine the validity period of the cookie with expires.*/
      res
        .status(200)
        .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 2 * 3600000) }) // 2hour
        .json(rest);
    } else {
      /*If there is no user, we generate a random number consisting of 20 characters. 
      We hash the number we produce using bcryptjs. We create a new user using the User model.
      We add this hash password to the user's password. We also add information from Body. 
      And we register the newly created user, generate its token and send it to the client. */

      const generatePassword =
        Math.random().toString(36).slice(-10) +
        Math.random().toString(36).slice(-10);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 12);

      const oauthUser = new User({
        username,
        surname,
        email,
        password: hashedPassword,
        profilePicture,
        verifyAccount: true,
        verified: true,
      });

      await oauthUser.save();
      const token = jwt.sign(
        {
          id: oauthUser._id,
        },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...rest } = oauthUser._doc;

      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 2 * 3600000),
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// login to the site
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "Please fill form"));
  }

  try {
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return next(errorHandler(400, "Registered email address not found"));
    }
    const validPassword = bcryptjs.compareSync(password, isUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET_KEY);

    if (!isUser.verified) {
      const oneTimePass = await new oneTimePassword({
        userId: isUser._id,
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
      }).save();

      await isUser.save();
      await sendEmail(isUser.username, isUser.surname, email, oneTimePass.otp);

      const { password: pass, ...rest } = isUser._doc;
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json(rest);
    } else {
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
  const { otp } = req.body;

  const verifyUserOtp = await oneTimePassword.findOne({ otp });
  if (verifyUserOtp?.otp !== otp) {
    return next(errorHandler(400, "Invalid Otp Check Your Email"));
  }

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

    const { password, ...rest } = updateUser._doc;
    await oneTimePassword.findOneAndDelete({ userId: updateUser._id });
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

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).clearCookie("token").json("User is Deleted");
  } catch (error) {
    next(error);
  }
};

const deleteVerifyUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) {
    next(errorHandler(400, "User not found"));
  }

  try {
    await User.findByIdAndDelete({ _id: id });
    await oneTimePassword.findOneAndDelete({ userId: id });
    res.status(200).json({
      message:
        "Registration was not completed because the account was not verified",
      status: 200,
    });
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
  oauth,
};
