const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const db = "mongodb://127.0.0.1:27017/two-factor";

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(5000, () => {
  console.log(`Server listening on port ${5000}`);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
