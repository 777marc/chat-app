const socket = io();

socket.on("newConnections", (message) => {
  console.log(`the server says:${message}`);
});

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("clicked");
//   socket.emit("increment");
// });
document.getElementById("myForm").addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Access the value entered in the input field
  var inputValue = document.getElementById("inputField").value;

  // Perform any action with the input value (for example, log it to the console)
  console.log("Submitted value:", inputValue);
  socket.emit("newMessage", inputValue);

  // You can add more code here to handle the form submission as needed
});

socket.on("serverResponse", (res) => {
  console.log("from the server...", res);
});
