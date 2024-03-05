const express = require("express");
const {
  getUsers,
  signup,
  signin,
  verifyOtp,
  verifyUpdate,
  getUser,
  signOut,
  deleteUser,
  updatedUser,
} = require("../controllers/userController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify", verifyOtp);
router.put("/verifyupdate/:id", verifyUpdate);
router.get("/:id", getUser);
router.post("/signOut/:id", signOut);
router.delete("/delete/:id", verifyToken, deleteUser);
router.put("/updateUser/:userId", verifyToken, updatedUser);
module.exports = router;
