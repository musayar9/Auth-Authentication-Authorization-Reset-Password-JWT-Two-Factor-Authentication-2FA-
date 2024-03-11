const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const verifyToken = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If token is not provided, return error
  if (!token) {
    return next(errorHandler(401, "User Not Authorized"));
  }
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // If token verification fails, return error
    if (err) {
      return next(errorHandler(401, "User Not Authorized"));
    }

    // Set user data from token in request object
    req.user = user;

    // Proceed to the next middleware
    next();
  });
};

module.exports = verifyToken;
