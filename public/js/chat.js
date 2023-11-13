const socket = io();

socket.on("countUpdated", (count) => {
  console.log("the cound has been updated:", count);
});

document.querySelector("#increment").addEventListener("click", () => {
  console.log("clicked");
  socket.emit("increment");
});
