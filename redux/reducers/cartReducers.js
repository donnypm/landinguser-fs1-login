import { ADD_CART, GET_CART, REMOVE_ITEM, INCREMENT, DECREMENT } from "./types";

const initialState = {
  cart: [],
  quantity: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      const itemExists = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

    case GET_CART:
      return {
        ...state,
        cart: state.cart.map((item) =>
          Number(item) === Number(action.payload)
            ? (item = action.payload)
            : item
        ),
        loading: false,
      };

    case REMOVE_ITEM:
      const filteredState = state.cart.filter(
        (item) => Number(item.id) !== Number(action.payload.id)
      );
      return { ...state, cart: filteredState };

    case DECREMENT:
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cart.splice(index, 1);
      } else {
        item.quantity--;
      }
      return { ...state };

    default:
      return state;
  }
}
