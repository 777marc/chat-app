const socket = io();

socket.on("newConnections", (message) => {
  console.log(`the server says:${message}`);
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Access the value entered in the input field
  var inputValue = document.getElementById("inputField").value;

  // Perform any action with the input value (for example, log it to the console)
  socket.emit("newMessage", inputValue);
});

socket.on("serverResponse", (res) => {
  console.log("from the server...", res);
});
