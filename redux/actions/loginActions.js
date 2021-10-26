import { LOGIN_USER, LOGOUT_USER } from "../reducers/types";

export const loginUser = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: user,
  });
  console.log("welcome " + user.name);
};

export const logoutUser = (user) => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: user,
  });
  console.log("berhasil logout");
};
