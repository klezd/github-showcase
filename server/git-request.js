const FormData = require("form-data");

const HandyStorage = require("handy-storage");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const storage = new HandyStorage({
  beautify: true,
});
storage.connect("./db.json");

module.exports = function (app) {
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
        storage.setState({ access_token: access_token });
        return res.json({ access_token: access_token });
      })
      .catch((error) => {
        console.error(error);
        return res.status(400).json(error);
      });
  });

  app.get("/user-info", (req, res) => {
    const queryName = req.query.name;
    const access_token = storage.state.access_token;

    const url = queryName
      ? "https://api.github.com/users/" + queryName
      : "https://api.github.com/user";

    fetch(url, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
      .then((r) => {
        if (!r.ok) {
          throw Error("User not found!");
        }
        return r.json();
      })
      .then((response) => {
        const { login, id, name, email, html_url, avatar_url, hireable } =
          response;
        const { followers, following, public_repos, public_gists } = response;
        const data = {
          userlogin: login,
          userid: id,
          username: name,
          useremail: email,
          userurl: html_url,
          useravatar: avatar_url,
          userhireable: hireable,
          userindex: {
            followers,
            following,
            public_gists,
            public_repos,
          },
        };
        storage.setState({ [`user_${id}`]: data, currentUser: login });
        return res.json(data);
      })
      .catch((error) => {
        console.error(error);
        return res.status(400).json({
          message: "Error occurred! Please check the user name again!",
        });
      });
  });

  app.get("/user-repos", (req, res) => {
    console.log("API GET user-repos");
    const access_token = storage.state.access_token;
    const user = storage.state.currentUser;
    const url = "https://api.github.com/users/" + user + "/repos";
    console.log(user, url);

    fetch(url, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
      .then((r) => {
        console.log(r);

        if (!r.ok) {
          console.log(r);
          throw Error("Bad request");
        }
        return r.json();
      })
      .then((response) => {
        console.log(response);
        return res.json(response);
      })
      .catch((error) => {
        console.error(error);
        return res.status(400).json({
          message: "Error occurred! Please check the user name again!",
        });
      });
  });
};
