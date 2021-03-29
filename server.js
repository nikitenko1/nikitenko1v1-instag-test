const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jwt-simple");
const chalk = require("chalk");
const socketio = require("socket.io");
// routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const notificationRouter = require("./routes/notification");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

const app = express();

// for body-parser middleware
app.use(express.json());

//cors middleware
app.use(cors());

// morgan logger for dev
app.use(logger("dev"));

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
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

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
app.use((err, req, res) => {
  console.log(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (err.name === "MulterError") {
    if (err.message === "File too large") {
      return res
        .status(400)
        .send({ error: "Your file exceeds the limit of 10MB." });
    }
  }
  res.status(err.statusCode).send({
    error:
      err.statusCode >= 500
        ? "An unexpected error ocurred, please try again later."
        : err.message,
  });
});

// App's connection port
const PORT = process.env.PORT || 5000;

const expressServer = app.listen(PORT, () => {
  console.log(
    chalk.blue(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
});

const io = socketio(expressServer);
app.set("socketio", io);
console.log("Socket.io listening for connections");

// Authenticate before establishing a socket connection
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    try {
      const user = jwt.decode(token, process.env.JWT_SECRET);
      if (!user) {
        return next(new Error("Not authorized."));
      }
      socket.user = user;
      return next();
    } catch (err) {
      next(err);
    }
  } else {
    return next(new Error("Not authorized."));
  }
}).on("connection", (socket) => {
  socket.join(socket.user.id);
  console.log("socket connected:", socket.id);
});
