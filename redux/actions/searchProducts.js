import { SEARCH_PRODUCTS } from "../reducers/types";

export const searchProducts = (searchText) => async (dispatch) => {
  dispatch({
    type: SEARCH_PRODUCTS,
    payload: searchText,
  });
  console.log(searchText);
};
