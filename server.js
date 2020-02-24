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
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on("connection", socket => {
  console.log("New client connected"), broadcastHeadToHeadQuestion(socket);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

/**
 * Constants
 */
const NUM_ROUNDS = 10;
/**
 * Instance Variables
 */
const rooms = {};
/**
 * Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
const joinRoom = (socket, room) => {
  room.sockets.push(socket);
  socket.join(room.id, () => {
    // store the room id in the socket for future use
    socket.roomId = room.id;
    console.log(socket.id, "Joined", room.id);
  });
};
/**
 * Will make the socket leave any rooms that it is a part of
 * @param socket A connected socket.io socket
 */
const leaveRooms = socket => {
  const roomsToDelete = [];
  for (const id in rooms) {
    const room = rooms[id];
    // check to see if the socket is in the current room
    if (room.sockets.includes(socket)) {
      socket.leave(id);
      // remove the socket from the room object
      room.sockets = room.sockets.filter(item => item !== socket);
    }
    // Prepare to delete any rooms that are now empty
    if (room.sockets.length == 0) {
      roomsToDelete.push(room);
    }
  }
  // Delete all the empty rooms that we found earlier
  for (const room of roomsToDelete) {
    delete rooms[room.id];
  }
};
/**
 * Will check to see if we have a game winner for the room.
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param sendMessage Whether or not to tell each socket if they've won or lost the game
 * @returns {boolean} true if we've found a winner. false if we haven't found a winner
 */
const checkScore = (room, sendMessage = false) => {
  let winner = null;
  for (const client of room.sockets) {
    if (client.score >= NUM_ROUNDS) {
      winner = client;
      break;
    }
  }
  if (winner) {
    if (sendMessage) {
      for (const client of room.sockets) {
        client.emit(
          "gameOver",
          client.id === winner.id ? "You won the game!" : "You lost the game :("
        );
      }
    }
    return true;
  }
  return false;
};
/**
 * At the start of each round, randomize the players positions, determine if
 * they should be "IT" or not, and increment the score if necessary
 * @param socket A connected socket.io socket
 * @param id The id sent by the client that represents the previous "IT" player.
 * If its null, we won't increment anyone's score
 */
const beginRound = (socket, id) => {
  // This is a hack to make sure this function is only being called once during
  // game play. Basically, the client needs to send us the
  if (id && socket.id !== id) {
    return;
  }
  // Get the room
  const room = rooms[socket.roomId];
  if (!room) {
    return;
  }
  // Make sure to cancel the 20 second lose round timer so we make sure we only
  // have one timer going at any point.
  if (room.timeout) {
    clearTimeout(room.timeout);
  }
  // If we've already found a game winner, we don't need to start a new round.
  if (checkScore(room)) {
    return;
  }

  // This is going to be a dictionary that we're going to send to every client.
  // the keys will represent the socket ID and the values will be another dictionary
  // that will represent each player.
  const output = {};
  // After all that madness, check if we have a game winner! If we do, then
  // just return out.
  if (checkScore(room, true)) {
    return;
  }
};
/**
 * The starting point for a user connecting to our lovely little multiplayer
 * server!
 */
io.on("connection", socket => {
  // give each socket a random identifier so that we can determine who is who when
  // we're sending messages back and forth!
  socket.id = uuid();
  console.log("a user connected");
  /**
   * Lets us know that players have joined a room and are waiting in the waiting room.
   */
  socket.on("ready", () => {
    console.log(socket.id, "is ready!");
    const room = rooms[socket.roomId];
    // when we have two players... START THE GAME!
    if (room.sockets.length == 2) {
      // tell each player to start the game.
      for (const client of room.sockets) {
        client.emit("initGame");
      }
    }
  });
  /**
   * The game has started! Give everyone their default values and tell each client
   * about each player
   * @param data we don't actually use that so we can ignore it.
   * @param callback Respond back to the message with information about the game state
   */
  socket.on("startGame", (data, callback) => {
    const room = rooms[socket.roomId];
    if (!room) {
      return;
    }
    const others = [];
    // Start the game in 5 seconds
    setTimeout(() => {
      beginRound(socket, null);
    }, 5000);
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
    callback(roomNames);
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
    callback();
  });
  /**
   * Gets fired when a player has joined a room.
   */
  socket.on("joinRoom", (roomId, callback) => {
    const room = rooms[roomId];
    joinRoom(socket, room);
    callback();
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
    socket.emit("FromAPI", broadcastedQuestion); // Emitting a new message. It will be consumed by the client
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
