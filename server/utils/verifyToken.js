const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler(401, "User Not Authorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "User Not Authorized"));
    }

    req.user = user;

    next();
  });
};

module.exports = verifyToken;
