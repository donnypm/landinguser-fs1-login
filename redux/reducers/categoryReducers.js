import { CATEGORY_ERROR, GET_CATEGORY } from "./types";

const initialState = {
  products: [],
  product: {},
  loading: true,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case CATEGORY_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
