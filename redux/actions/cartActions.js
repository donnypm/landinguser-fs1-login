import { ADD_CART, DECREMENT, GET_CART, REMOVE_ITEM } from "../reducers/types";

export const addCarts = (product) => async (dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: product,
  });
  console.log(product);
};

export const getCarts = (product) => async (dispatch) => {
  dispatch({
    type: GET_CART,
    payload: product,
  });
  console.log(product);
};

export const removeItem = (item) => async (dispatch) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: item,
  });
  console.log(item);
};

export const incrementItem = (item) => async (dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: item,
  });
  console.log("quantity = " + item.quantity);
};

export const decrementItem = (item) => async (dispatch) => {
  dispatch({
    type: DECREMENT,
    payload: item,
  });
  console.log("quantity = " + item.quantity);
};
