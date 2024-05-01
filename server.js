const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const path = require('path');
const hpp = require("hpp");
const swaggerUi= require("swagger-ui-express");
const swaggerOption = {customCssUrl: '/swagger-ui.css'};
const swaggerDocs = require("./config/swaggerConfig");


//Load env vars
 dotenv.config();

//connect to database
connectDB();

const rentals = require("./routes/rentals");
const auth = require("./routes/auth");
const bookings = require("./routes/bookings");
const upload = require("./routes/upload");
const promotions = require("./routes/promotions");
const feedbacks = require("./routes/feedbacks");


var corsOptions = {
  origin: process.env.HOST,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // in 10mins, api can only be accessed up to 500 times by the same user
  max: 1000,
});

const app = express();
const cors = require("cors");
// app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(cors());
// app.use(cors());
// app.options('*', cors());
app.use(mongoSanitize());
//add body parser
app.use(express.json());
//Sanitize data
app.use(mongoSanitize());
//security header
app.use(helmet());
//Prevent XSS attacks
app.use(xss());
//rate limiter
//app.use(limiter);
//Prevent http param pollutions
app.use(hpp());

app.use(express.static(path.join(__dirname, 'public')));
//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOption));

app.use("/api/v1/rentals", rentals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/bookings", bookings);
app.use("/api/v1/upload", upload);
app.use("/api/v1/promotions", promotions);
app.use("/api/v1/feedbacks", feedbacks);


//Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    "on " + process.env.HOST + ":" + PORT
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});

