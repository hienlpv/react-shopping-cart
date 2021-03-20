import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../types";

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
      const cartItems = state.cartItems.slice();
      const product = action.payload;
      let alreadyInCart = false;
      cartItems.forEach((item) => {
        if (item._id === product._id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        cartItems.push({ ...product, count: 1 });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
      return { cartItems: cartItems };
    case REMOVE_PRODUCT_FROM_CART:
      return { cartItems: action.payload };
    default:
      return state;
  }
};
