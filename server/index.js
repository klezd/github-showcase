const express = require("express");
// Cors no more needed when hosting
// const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const port = process.env.PORT || 5000;

// Below is added to hosted
// const buildPath = path.join(__dirname, "../build");
app.use(express.static(path.resolve(__dirname, "../build")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cors no more needed when hosting
// const corsOptions = {
//   origin: "localhost:*",
// };
// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// create a GET route

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// All git requests here
require("./git-request.js")(app);

app.get("/*", (req, res) => {
  res.header("Cache-Control", "max-age=-1");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
