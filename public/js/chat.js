const socket = io();

// elements
const $messageForm = document.getElementById("message-form");
const $messageFormInput = document.getElementById("input");
const $messageFormButton = document.getElementById("submit");
const $sendLocationButton = document.getElementById("send-location");

socket.on("newConnections", (message) => {
  console.log(`the server says:${message}`);
});

$messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  $messageFormButton.disabled = true;

  var message = $messageFormInput.value;

  socket.emit("newMessage", message, () => {
    console.log("server acknowledged");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    $messageFormButton.disabled = false;
  });
});

socket.on("serverResponse", (res) => {
  addItem(res, "recievedMessages");
});

$sendLocationButton.addEventListener("click", () => {
  $sendLocationButton.disabled = true;
  if (!navigator.geolocation) {
    $sendLocationButton.disabled = false;
    return alert("geolocation not supported by your browser");
  }

  //console.log("sending location");
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, () => {
      console.log("server ack receipt");
      $sendLocationButton.disabled = false;
    });
  });
});
