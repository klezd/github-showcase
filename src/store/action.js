import { ActionType } from "redux-promise-middleware";
import {
  LOGIN_WITH_GITHUB,
  GET_GITHUB_TOKEN,
  GET_USER_INFO,
  GET_USER_REPOS,
  LOGIN,
} from "./types";

import { getUrl, scope, state } from "../utils";

const redirectUri = getUrl("auth/login-with-github");
const baseUri = "http://localhost:5000";

export const loginGithub = () => (dispatch) => {
  dispatch({
    type: `${LOGIN_WITH_GITHUB}_${ActionType.Pending}`,
  });

  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=${scope.join(
    " "
  )}&redirect_uri=${redirectUri}`;
  const popup = window.open(url, "height=300, width=500");

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
  const res = await fetch(baseUri + "/authenticate-with-github", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const datares = await res.json();
    const token = datares["access_token"];
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

export const setUserLogged = () => (dispatch) => {
  dispatch({
    type: LOGIN,
  });
};

export const unauthorizeUser = () => (dispatch) => {
  window.location.href = "/";
  localStorage.clear();
  dispatch({ type: "UNAUTHORIZE" });
};

export const getUserInfo = (name) => async (dispatch) => {
  console.count("getUserInfo");
  dispatch({
    type: `${GET_USER_INFO}_${ActionType.Pending}`,
  });

  const url = !name
    ? baseUri + "/user-info"
    : baseUri + "/user-info?name=" + name;
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    // dispatch(getUserRepos());
    return dispatch({
      type: `${GET_USER_INFO}_${ActionType.Fulfilled}`,
      payload: data,
    });
  } else {
    const error = await res.json();
    console.log(error);
    return dispatch({
      type: `${GET_USER_INFO}_${ActionType.Rejected}`,
      payload: error,
    });
  }
};

export const getUserRepos = () => async (dispatch) => {
  console.count("getUserRepos");

  dispatch({
    type: `${GET_USER_REPOS}_${ActionType.Pending}`,
  });

  const url = baseUri + "/user-repos";
  console.log(url);
  const res = await fetch(url);
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return dispatch({
      type: `${GET_USER_REPOS}_${ActionType.Fulfilled}`,
      payload: data,
    });
  } else {
    const error = await res.json();

    console.log(error);
    return dispatch({
      type: `${GET_USER_REPOS}_${ActionType.Rejected}`,
      payload: error,
    });
  }
};
