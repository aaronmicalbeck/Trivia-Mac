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
const uuid = require("uuid");

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

///////////////////////////////////////////////////////////////////////////////npm unp

// ====== React App ======
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

// SOCKETS! Oh Yes!
io.on("connection", socket => {
  console.log("New client connected"),
    setInterval(() => broadcastQuestion(socket), 1000);
  broadcastHeadToHeadQuestion(socket);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

/**
 * Gets fired when someone wants to get the list of rooms. respond with the list of room names.
 */
socket.on("getRoomNames", (data, callback) => {
  const roomNames = [];
  for (const id in rooms) {
    const { name } = rooms[id];
    const room = { name, id };
    roomNames.push(room);
  }
  // callback(roomNames);
});
/**
 * Gets fired when a user wants to create a new room.
 */
socket.on("createRoom", (roomName, callback) => {
  const room = {
    id: uuid(), // generate a unique id for the new room, that way we don't need to deal with duplicates.
    name: roomName,
    sockets: []
  };
  rooms[room.id] = room;
  // have the socket join the room they've just created.
  joinRoom(socket, room);
  // callback();
});
/**
 * Gets fired when a player has joined a room.
 */
socket.on("joinRoom", (roomId, callback) => {
  const room = rooms[roomId];
  joinRoom(socket, room);
  // callback();
});
/**
 * Gets fired when a player leaves a room.
 */
socket.on("leaveRoom", () => {
  leaveRooms(socket);
});
/**
 * Gets fired when a player disconnects from the server.
 */
socket.on("disconnect", () => {
  console.log("user disconnected");
  leaveRooms(socket);
});

// Question Generator

let broadcastedQuestion = {};
function generateQuestion() {
  axios.get("https://opentdb.com/api.php?amount=50").then(response => {
    // console.log(response.data.results)
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

// Head To Head Question Generator

let headToHeadBroadcastedQuestion = {};
function generateHeadToHeadQuestion() {
  axios.get("https://opentdb.com/api.php?amount=10").then(response => {
    // console.log(response.data.results)
    pickedQuestion =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ];
    choices = pickedQuestion.incorrect_answers.concat(
      pickedQuestion.correct_answer
    );
    choices.sort(() => Math.random() - 0.5);
    pickedQuestion.choices = choices;
    headToHeadBroadcastedQuestion = pickedQuestion;
  });
}
setInterval(generateHeadToHeadQuestion, 1000);
// Gets a question from API and broadcasts to anyone listening

const broadcastQuestion = async socket => {
  try {
    socket.emit("marathonGame", broadcastedQuestion); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

const broadcastHeadToHeadQuestion = async socket => {
  try {
    socket.emit("FromAPI2", headToHeadBroadcastedQuestion); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

// let roomno = 1;
// io.on("connection", function(socket) {
//   //Increase roomno 2 clients are present in a room.
//   if (
//     io.nsps["/"].adapter.rooms["room-" + roomno] &&
//     io.nsps["/"].adapter.rooms["room-" + roomno].length > 0
//   )
//     roomno++;
//   socket.join("room-" + roomno);

//   //Send this event to everyone in the room.
//   io.sockets
//     .in("room-" + roomno)
//     .emit("connectToRoom", "You are in room no. " + roomno);
// });

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
