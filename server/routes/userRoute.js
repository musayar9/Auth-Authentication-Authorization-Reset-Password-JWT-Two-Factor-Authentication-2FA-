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
} = require("../controllers/userController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify", verifyOtp);
router.put("/verifyupdate/:id", verifyUpdate);
router.get("/:id", getUser);
router.post("/signOut", signOut);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
