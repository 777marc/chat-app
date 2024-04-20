const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/messages");
const {
  getUser,
  addUser,
  removeUser,
  getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(room);

    socket.broadcast.emit(
      "serverResponse",
      generateMessage(`Welcome to ${room}!`)
    );

    socket.broadcast
      .to(room)
      .emit(
        "serverResponse",
        generateMessage(`${username} has joined the room.`)
      );

    callback();
  });

  socket.on("message", (message, callback) => {
    io.to("1").emit("serverResponse", generateMessage(message));
    callback();
  });

  socket.on("sendLocation", (position, callback) => {
    const { latitude, longitude } = position;
    socket.broadcast.emit(
      "locationResponse",
      generateMessage(`https://google.com/maps?q=${latitude},${longitude}`)
    );
    callback();
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("serverResponse", generateMessage("A user has disconnected."));
  });

  socket.emit("join", { username, room }, (error) => {});
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});
