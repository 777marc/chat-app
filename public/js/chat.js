const socket = io();

// elements
const $messageForm = document.getElementById("message-form");
const $messageFormInput = document.getElementById("input");
const $messageFormButton = document.getElementById("submit");
const $sendLocationButton = document.getElementById("send-location");
const $messages = document.getElementById("messages");

// templates
const $messageTemplate = document.getElementById("message-template").innerHTML;

socket.on("newConnections", (message) => {
  console.log(`the server says:${message}`);
});

socket.on("serverResponse", (message) => {
  const html = Mustache.render($messageTemplate, { message });
  $messages.insertAdjacentHTML("beforeend", html);
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

$sendLocationButton.addEventListener("click", () => {
  $sendLocationButton.disabled = true;
  if (!navigator.geolocation) {
    $sendLocationButton.disabled = false;
    return alert("geolocation not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, () => {
      console.log("server ack receipt");
      $sendLocationButton.disabled = false;
    });
  });
});
