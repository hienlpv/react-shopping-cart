import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  CLEAN_CART,
} from "../types";

export const cartReducers = (
  state = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  action
) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { cartItems: action.payload };
    case REMOVE_PRODUCT_FROM_CART:
      return { cartItems: action.payload };
    case CLEAN_CART:
      return { cartItems: action.payload };
    default:
      return state;
  }
};
