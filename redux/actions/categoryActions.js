import { GET_PRODUCTS, PRODUCTS_ERROR } from "../reducers/types";
import axios from "axios";

export const getMen = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/men's clothing`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const getWomen = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/women's clothing`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const getJewelery = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/jewelery`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const getElectronics = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/electronics`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: error,
    });
  }
};
