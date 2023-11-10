const express = require("express");
const path = require("path"); // Node.js module for working with file paths

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
