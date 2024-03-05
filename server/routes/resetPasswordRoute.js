const express = require("express");

const { resetPassword, changePassword, changePasswordGet } = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/", resetPassword);
router.put("/:userId/token/:token", changePassword);
router.get("/:userId/token/:token", changePasswordGet);
module.exports = router;
