const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
//Load env vars
dotenv.config({ path: "../config/config.env" });
const getFeedbacks = require("./getFeedbacks");
const {getMe} = require("./getMe");
const {protect} = require("../middleware/auth");

const app = express();
const cors = require("cors");
app.use(cors());
app.get("/api/v1/feedbacks/:id", getFeedbacks);
app.get("/api/v1/auth/me", protect, getMe);


//Cookie parser
app.use(cookieParser());

const PORT = 6000;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    "on " + process.env.HOST + ":" + PORT
  )
);

// Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   //close server and exit process
//   server.close(() => process.exit(1));
// });

module.exports = app;