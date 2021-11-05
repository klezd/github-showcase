import { ActionType } from "redux-promise-middleware";
import { LOGIN_WITH_GITHUB, GET_GITHUB_TOKEN } from "./types";

const initialState = {
  isLoggedin: false,
  isLoadingAuth: false,
  isLoadingToken: false,
  accessToken: null,
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

    default:
      return {
        ...state,
      };
  }
}

export default reducer;
