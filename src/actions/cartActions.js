import { REMOVE_PRODUCT_FROM_CART } from "../types";

export const removeProductFromCart = (cartItems, product) => (dispatch) => {
  const new_cartItems = cartItems.slice().filter((x) => x._id !== product._id);
  console.log(new_cartItems);
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: new_cartItems,
  });
  localStorage.setItem("cartItems", JSON.stringify(new_cartItems));
};
