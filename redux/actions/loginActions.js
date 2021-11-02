import { LOGIN_USER, LOGOUT_USER } from "../reducers/types";
import axios from "axios";

export const loginUser = (user) => async (dispatch) => {
  await axios
    .post(`https://my-udemy-api.herokuapp.com/api/v1/user/signin`, user)
    .then((response) => {
      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });
      console.log(response);
    });
};

export const logoutUser = (user) => async (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: user,
  });
  console.log("berhasil logout");
};
