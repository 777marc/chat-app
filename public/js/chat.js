const socket = io();

socket.on("newConnections", (message) => {
  console.log(`the server says:${message}`);
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("submit").disabled = true;

  var inputValue = document.getElementById("inputField").value;

  socket.emit("newMessage", inputValue, () => {
    console.log("server acknowledged");
    document.getElementById("inputField").value = "";
    document.getElementById("inputField").focus();
    document.getElementById("submit").disabled = false;
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
