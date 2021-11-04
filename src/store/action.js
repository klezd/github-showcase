import { ActionType } from "redux-promise-middleware";
import { getUrl, scope, state } from "../utils";
import { LOGIN_WITH_GITHUB } from "./types";

const redirectUri = getUrl("auth/login-with-github");

export const loginGithub = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}&scope=${scope.join(
    " "
  )}&redirect_uri=${redirectUri}`;
  const popup = window.open(url, "height=300, width=500");
  return (dispatch) => {
    dispatch({
      type: `${LOGIN_WITH_GITHUB}_${ActionType.Pending}`,
    });
    const timer = setInterval(function () {
      if (popup.closed) {
        clearInterval(timer);
        dispatch({
          type: `${LOGIN_WITH_GITHUB}_${ActionType.Fulfilled}`,
        });
      }
    }, 500);
  };
};

export const getGithubAccessToken = (code) => async (dispatch) => {
  // const request = await axios.post(
  //   "https://github.com/login/oauth/access_token",
  //   {
  //     params: {
  //       client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  //       client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  //       redirect_uri: redirectUri,
  //       code,
  //     },
  //   }
  // );
  dispatch({
    type: `${LOGIN_WITH_GITHUB}_${ActionType.Pending}`,
  });

  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&code=${code}&redirect_uri=${redirectUri}`;
  const popup = window.open(url, "height=300, width=500");
};

export const unauthorizeUser = () => (dispatch) => {
  window.location.href = "/";
  localStorage.clear();
  dispatch({ type: "UNAUTHORIZE" });
};
