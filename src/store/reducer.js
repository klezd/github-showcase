import { ActionType } from "redux-promise-middleware";
import {
  LOGIN_WITH_GITHUB,
  GET_GITHUB_TOKEN,
  GET_USER_INFO,
  GET_USER_DATA,
  LOGIN,
} from "./types";

const initialState = {
  isLoggedin: false,
  userLogged: "",
  isLoadingAuth: false,
  isLoadingToken: false,
  isLoadingData: false,
  accessToken: null,
  userData: {},
  userRepos: [],
  userCont: [],
  errorMsg: "",
  errorLoadData: "",
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `${LOGIN_WITH_GITHUB}_${ActionType.Pending}`:
      return {
        ...state,
        isLoadingAuth: true,
      };

    case `${LOGIN_WITH_GITHUB}_${ActionType.Fulfilled}`:
    case `${LOGIN}`:
      return {
        ...state,
        isLoadingAuth: false,
        isLoggedin: true,
      };

    case `${LOGIN_WITH_GITHUB}_${ActionType.Rejected}`:
      return {
        ...state,
        isLoadingAuth: false,
        isLoggedin: false,
      };

    case `${GET_GITHUB_TOKEN}_${ActionType.Pending}`:
      return {
        ...state,
        isLoadingToken: true,
      };

    case `${GET_GITHUB_TOKEN}_${ActionType.Fulfilled}`:
      return {
        ...state,
        isLoadingToken: false,
        accessToken: payload.GHAccessToken,
      };

    case `${GET_GITHUB_TOKEN}_${ActionType.Rejected}`:
      return {
        ...state,
        isLoadingToken: false,
      };

    case `${GET_USER_INFO}_${ActionType.Pending}`:
    case `${GET_USER_DATA}_${ActionType.Pending}`:
      return {
        ...state,
        isLoadingData: true,
      };
    case `${GET_USER_INFO}_${ActionType.Fulfilled}`:
      return {
        ...state,
        isLoadingData: false,
        userData: payload.data,
        userLogged: payload.loggedAs,
      };

    case `${GET_USER_DATA}_${ActionType.Fulfilled}`:
      return {
        ...state,
        isLoadingData: false,
        userRepos: payload,
        // userRepos: payload.repos,
        // userCont: payload.contribute,
        errorLoadData: "",
      };

    case `${GET_USER_INFO}_${ActionType.Rejected}`:
      return {
        ...state,
        isLoadingData: false,
        errorMsg: payload.message,
      };
    case `${GET_USER_DATA}_${ActionType.Rejected}`:
      return {
        ...state,
        isLoadingData: false,
        errorLoadData:
          "Error Occurred! Please reload the site or come back later!",
      };

    default:
      return {
        ...state,
      };
  }
}

export default reducer;
