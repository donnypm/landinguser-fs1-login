import { LOGIN_USER, LOGOUT_USER } from "./types";

const initialState = {
  users: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        users: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        users: null,
      };

    default:
      return state;
  }
}
