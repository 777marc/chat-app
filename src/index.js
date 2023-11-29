const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.on("message", (message, callback) => {
    socket.broadcast.emit("serverResponse", generateMessage(message));
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

  socket.on("join", ({ username, room }) => {
    console.log("room", room, username);
    socket.join(room);
    socket.broadcast.emit("message", generateMessage(`Welcome to ${room}!`));
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined the room.`));
  });

  socket.on("disconnect", () => {
    io.emit("serverResponse", generateMessage("A user has disconnected."));
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});
