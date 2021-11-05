import { ActionType } from "redux-promise-middleware";
import { LOGIN_WITH_GITHUB, GET_GITHUB_TOKEN } from "./types";

import { getUrl, scope, state } from "../utils";

const redirectUri = getUrl("auth/login-with-github");

export const loginGithub = () => (dispatch) => {
  dispatch({
    type: `${LOGIN_WITH_GITHUB}_${ActionType.Pending}`,
  });

  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=${scope.join(
    " "
  )}&redirect_uri=${redirectUri}`;
  const popup = window.open(url, "height=300, width=500");
  // return () => {
  //   const timer = setInterval(function () {
  //     console.log("popup closed");
  //     if (popup.closed) {
  //       clearInterval(timer);
  //       dispatch({
  //         type: `${LOGIN_WITH_GITHUB}_${ActionType.Fulfilled}`,
  //       });
  //     }
  //   }, 300);
  // };

  popup.onbeforeunload = function () {
    console.log("closed");

    dispatch({
      type: `${LOGIN_WITH_GITHUB}_${ActionType.Fulfilled}`,
    });
    localStorage.setItem("isLoggedIn", true);
    console.log(typeof localStorage.getItem("isLoggedIn"));
  };

  return;
};

export const getGithubAccessToken = (code) => async (dispatch) => {
  dispatch({
    type: `${GET_GITHUB_TOKEN}_${ActionType.Pending}`,
  });
  const data = { code, redirect_uri: redirectUri };
  const res = await fetch("http://localhost:5000/authenticate-with-github", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const datares = await res.json();
    console.log(datares);
    const token = datares["access_token"];
    localStorage.setItem("GHTok", token);
    dispatch({
      type: `${GET_GITHUB_TOKEN}_${ActionType.Fulfilled}`,
      payload: {
        GHAccessToken: token,
      },
    });
    window.close();
  } else {
    dispatch({
      type: `${GET_GITHUB_TOKEN}_${ActionType.Rejected}`,
    });
  }
};

export const unauthorizeUser = () => (dispatch) => {
  window.location.href = "/";
  localStorage.clear();
  dispatch({ type: "UNAUTHORIZE" });
};
