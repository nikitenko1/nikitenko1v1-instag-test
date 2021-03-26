const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const chalk = require("chalk");
// routes
// const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user");
// const productRouter = require("./routes/product");
// const reviewRouter = require("./routes/review");
// const orderRouter = require("./routes/order");
// const categoryRouter = require("./routes/category");
const app = express();

// for body-parser middleware
app.use(express.json());

//cors middleware
app.use(cors());

// morgan logger for dev
app.use(logger("dev"));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Database uri
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//test database connection
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(chalk.green("Database connected succefully..."));
});

// Set up our main routes
// git

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// serve static assets if in production (heroku configuration)
if (process.env.NODE_ENV !== "production") require("dotenv").config();

if (process.env.NODE_ENV == "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// if the request passes all the middleware without a response
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// for general error handling
app.use((error, req, res) => {
  res.status(error.status || 500).json({
    message: error.response,
  });
});

// App's connection port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.blue(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
});
