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
  socket.broadcast.emit("newConnections", "new client has joined");

  socket.on("message", (message, callback) => {
    socket.broadcast.emit("serverResponse", generateMessage(message));
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("serverResponse", generateMessage("A user has disconnected."));
  });

  socket.on("sendLocation", (position, callback) => {
    const { latitude, longitude } = position;
    socket.broadcast.emit(
      "locationResponse",
      generateMessage(`https://google.com/maps?q=${latitude},${longitude}`)
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});
