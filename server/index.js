const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const FormData = require("form-data");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const port = process.env.SERVER_PORT || 5000;

const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

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

// Create Post route
app.post("/authenticate-with-github", (req, res) => {
  const { code, redirect_uri } = req.body;
  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.text();
    })
    .then((r) => {
      let params = new URLSearchParams(r);
      const access_token = params.get("access_token");
      console.log(r);
      return res.json({ access_token: access_token });
      // return { access_token: access_token };
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).json(error);
    });
});

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
