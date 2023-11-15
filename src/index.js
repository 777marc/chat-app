const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("new connection");

  socket.broadcast.emit("newConnections", "new client has joined");

  socket.on("newMessage", (message, callback) => {
    io.emit("serverResponse", `the server recieved: ${message}.`);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("serverResponse", "A user has disconnected.");
  });

  socket.on("sendLocation", (position, callback) => {
    const { latitude, longitude } = position;
    socket.broadcast.emit(
      "serverResponse",
      `https://google.com/maps?q=${latitude},${longitude}`
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});
