// //////////////////////////////////////
// Environmental variables
if (process.env.NODE_ENV !== "production") {
  console.log("loading dev environments");
  require("dotenv").config();
}
require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./utils/passport");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.static("public"));
const server = http.createServer(app);
const routes = require("./controllers");
const PORT = process.env.PORT || 8080;
const io = require("socket.io")(server);
const axios = require("axios");
const multer = require("multer");

// ===== Middleware ====
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Set MongoDB connection

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://user1:password1@ds335648.mlab.com:35648/heroku_0zg2r9s7",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(
  session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ==== if its production environment!
if (process.env.NODE_ENV === "production") {
  console.log("Prod Mode Enabled");
  app.use(express.static("client/build"));
}

// ====== Routing & Controllers =====
app.use(routes);

let floatingFileName = "error";
///////////////////////////////////////////////////////////////////////////////
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./client/public/images",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
    // cb(null, file.fieldname + path.extname(file.originalname));
  }
});
// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
app.post("/cms/GD8PQX3UV18999AARONWITHANEY/filename", (req, res) => {
  floatingFileName = req.body.body.toLowerCase().split(".")[0];
  res.send("name collected");
});
app.post("/cms/GD8PQX3UV18999AARONWITHANEY/upload", (req, res) => {
  let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single(floatingFileName);
  upload(req, res, err => {
    if (err) {
      res.send({
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.send({
          msg: "Error: No File Selected!"
        });
      } else {
        res.send({
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

// ====== React App ======
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ====== Error handler ====
app.use(function (err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});


// SOCKETS! Oh Yes!
io.on("connection", socket => {
  console.log("New client connected"),
    setInterval(() => broadcastQuestion(socket), 1000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});


// Question Generator

let broadcastedQuestion = {};
function generateQuestion() {
  axios.get("https://opentdb.com/api.php?amount=50").then(response => {
    pickedQuestion =
      response.data.results[
      Math.floor(Math.random() * response.data.results.length)
      ];
    choices = pickedQuestion.incorrect_answers.concat(
      pickedQuestion.correct_answer
    );
    choices.sort(() => Math.random() - 0.5);
    pickedQuestion.choices = choices;
    broadcastedQuestion = pickedQuestion;
  });
}
setInterval(generateQuestion, 10000);

// Gets a question from API and broadcasts to anyone listening

const broadcastQuestion = async socket => {
  try {
    socket.emit("FromAPI", broadcastedQuestion); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
