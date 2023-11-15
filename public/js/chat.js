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
  socket.emit("newMessage", inputValue, () => {
    console.log("server acknowledged");
    document.getElementById("inputField").value = "";
  });
});

socket.on("serverResponse", (res) => {
  console.log("from the server...", res);
});

document.querySelector("#sendLocation").addEventListener("click", () => {
  document.getElementById("sendLocation").disabled = true;
  if (!navigator.geolocation) {
    document.getElementById("sendLocation").disabled = false;
    return alert("geolocation not supported by your browser");
  }

  //console.log("sending location");
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, () => {
      console.log("server ack receipt");
      document.getElementById("sendLocation").disabled = false;
    });
  });
});
