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
    addItem(inputValue, "sentMessages");
  });
});

socket.on("serverResponse", (res) => {
  addItem(res, "recievedMessages");
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

function addItem(message, list) {
  // Get the UL element
  var ulElement = document.getElementById(list);

  // Create a new list item
  var liElement = document.createElement("li");

  // Set the text content of the list item (you can modify this as needed)
  var itemText = document.createTextNode(message);
  liElement.appendChild(itemText);

  // Append the new list item to the UL
  ulElement.appendChild(liElement);
}
