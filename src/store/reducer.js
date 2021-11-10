import { ActionType } from "redux-promise-middleware";
import {
  LOGIN_WITH_GITHUB,
  GET_GITHUB_TOKEN,
  GET_USER_INFO,
  LOGIN,
} from "./types";

const initialState = {
  isLoggedin: false,
  isLoadingAuth: false,
  isLoadingToken: false,
  isLoadingData: false,
  accessToken: null,
  userData: {},
  errorMsg: "",
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
      return {
        ...state,
        isLoadingData: true,
      };
    case `${GET_USER_INFO}_${ActionType.Fulfilled}`:
      return {
        ...state,
        isLoadingData: false,
        userData: payload,
      };

    case `${GET_USER_INFO}_${ActionType.Rejected}`:
      return {
        ...state,
        isLoadingData: false,
        errorMsg: payload.message,
      };

    default:
      return {
        ...state,
      };
  }
}

export default reducer;
