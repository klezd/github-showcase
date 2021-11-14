import { ActionType } from "redux-promise-middleware";
import {
  LOGIN_WITH_GITHUB,
  GET_GITHUB_TOKEN,
  GET_USER_INFO,
  GET_USER_DATA,
  LOGIN,
} from "./types";

import { getUrl, scope, state } from "../utils";

const redirectUri = getUrl("auth/login-with-github");

//  below Comment for hosting
// const baseUri = window.location.origin.includes("localhost")
//   ? "http://localhost:5000"
//   : window.location.origin;
const baseUri = "";

export const loginGithub = () => (dispatch) => {
  console.log("loginGithub");
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
  console.log("getGithubAccessToken");
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
  console.log("setUserLogged");
  dispatch({
    type: LOGIN,
  });
};

export const unauthorizeUser = () => (dispatch) => {
  console.log("unauthorizeUser");
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

export const getUserData = () => async (dispatch) => {
  console.count("getUserData");
  dispatch({
    type: `${GET_USER_DATA}_${ActionType.Pending}`,
  });

  const url = baseUri + "/user-repos";
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    const reposArr = data.sort((a, b) =>
      a["updated_at"] < b["updated_at"]
        ? 1
        : a["updated_at"] > b["updated_at"]
        ? -1
        : 0
    );

    return dispatch({
      type: `${GET_USER_DATA}_${ActionType.Fulfilled}`,
      payload: reposArr,
    });
  } else {
    const error = await res.json();
    console.log(error);
    return dispatch({
      type: `${GET_USER_DATA}_${ActionType.Rejected}`,
      payload: error.message,
    });
  }
};

// // TODO Remove comment and fix error of 500 / fetch anomyous
// export const getUserData = () => async (dispatch) => {
//   console.count("getUserData");

//   dispatch({
//     type: `${GET_USER_DATA}_${ActionType.Pending}`,
//   });

//   const repoUrl = baseUri + "/user-repos";
//   // const contUrl = baseUri + "/user-contribute";

//   try {
//     let [reposRaw /* contributeRaw */] = await Promise.all([
//       fetch(repoUrl),
//       // fetch(contUrl),
//     ]);
//     const reposData = await reposRaw.json();
//     // const contData = await contributeRaw.json();
//     const reposArr = reposData.sort((a, b) =>
//       a["updated_at"] < b["updated_at"]
//         ? 1
//         : a["updated_at"] > b["updated_at"]
//         ? -1
//         : 0
//     );

//     dispatch({
//       type: `${GET_USER_DATA}_${ActionType.Fulfilled}`,
//       payload: { /* contribute: contData, */ repos: reposArr },
//     });
//   } catch (e) {
//     console.log(e);
//     return dispatch({
//       type: `${GET_USER_DATA}_${ActionType.Rejected}`,
//       payload: e.message,
//     });
//   }
// };

export const getARepo = (uname, id) => async (dispatch) => {};
