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

let count = 0;

io.on("connection", (socket) => {
  console.log("new connection");

  socket.emit("newConnections", "Welcome");

  // socket.on("increment", () => {
  //   count++;
  //   // gobal emit to all connected clients
  //   io.emit("countUpdated", count);
  // });

  socket.on("newMessage", (message) => {
    io.emit("serverResponse", `the server recieved: ${message}.`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});
