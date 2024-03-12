const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const resetRoutes = require("./routes/resetPasswordRoute");
const path = require("path");
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

path.resolve();

app.use("/api/users", userRoutes);
app.use("/api/reset-password", resetRoutes);
app.listen(5000, () => {
  console.log(`Server listening on port ${5000}`);
});
app.use(express.static(path.join(path.resolve(), "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client", "dist", "index.html"));
});
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
