import { GET_PRODUCTS, PRODUCTS_ERROR, SEARCH_PRODUCTS } from "./types";

const initialState = {
  products: [],
  product: {},
  searchResults: [],
  loading: true,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: state.products.filter((product) =>
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    default:
      return state;
  }
}
