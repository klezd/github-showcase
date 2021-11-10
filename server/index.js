const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const port = process.env.SERVER_PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const corsOptions = {
  origin: "http://localhost:3002",
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// create a GET route
app.get("/", (req, res) => {});

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// All git requests here
require("./git-request.js")(app);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
