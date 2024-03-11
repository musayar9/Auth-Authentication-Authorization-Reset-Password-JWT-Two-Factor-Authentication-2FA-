const mongoose = require("mongoose");
const crypto = require("crypto");
const oneTimePasswordModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
      index: true,
      unique: true,
      default: Math.floor(100000 + Math.random() * 900000).toString(),
    },
  },
  { timestamp: true }
);

oneTimePasswordModel.index({ createAt: 1 }, { expiresAfterSeconds: 3600 });

const oneTimePassword = mongoose.model("oneTimePassword", oneTimePasswordModel);

module.exports = oneTimePassword;
