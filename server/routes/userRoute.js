const express = require("express");
const {
  getUsers,
  signup,
  signin,
  deleteVerifyUser,
  verifyUpdate,
  getUser,
  signOut,
  deleteUser,
  updatedUser,
  verifyUserOtp,

  oauth,
} = require("../controllers/userController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/verifyUserOtp", verifyUserOtp);
router.put("/verifyupdate/:id", verifyUpdate);
router.get("/:id", getUser);
router.post("/signOut/:id", signOut);
router.delete("/delete/:id", verifyToken, deleteUser);
router.delete("/deleteVerifyUser/:id", deleteVerifyUser);
router.put("/updateUser/:userId", verifyToken, updatedUser);
router.post("/oauth", oauth)
module.exports = router;
