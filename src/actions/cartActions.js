import {
  REMOVE_PRODUCT_FROM_CART,
  ADD_PRODUCT_TO_CART,
  CLEAN_CART,
} from "../types";

export const addProductToCart = (cartItems, product) => (dispatch) => {
  const new_cartItems = cartItems.slice();
  let alreadyInCart = false;
  new_cartItems.forEach((item) => {
    if (item._id === product._id && item.imgIndex === product.imgIndex) {
      item.count += product.count;
      alreadyInCart = true;
    }
  });
  if (!alreadyInCart) {
    new_cartItems.push({ ...product });
  }
  localStorage.setItem("cartItems", JSON.stringify(new_cartItems));
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: new_cartItems,
  });
};

export const decreaseProductFromCart = (cartItems, product) => (dispatch) => {
  const new_cartItems = cartItems.slice();
  new_cartItems.forEach((item) => {
    if (item._id === product._id && item.imgIndex === product.imgIndex) {
      item.count--;
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(new_cartItems));

  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: new_cartItems,
  });
};

export const increaseProductFromCart = (cartItems, product) => (dispatch) => {
  const new_cartItems = cartItems.slice();
  new_cartItems.forEach((item) => {
    if (item._id === product._id && item.imgIndex === product.imgIndex) {
      item.count++;
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(new_cartItems));

  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: new_cartItems,
  });
};

export const removeProductFromCart = (cartItems, product) => (dispatch) => {
  console.log(cartItems);
  console.log(product);
  const new_cartItems = cartItems
    .slice()
    .filter((x) => x._id !== product._id || x.imgIndex !== product.imgIndex);
  localStorage.setItem("cartItems", JSON.stringify(new_cartItems));
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: new_cartItems,
  });
};

export const cleanCart = () => (dispatch) => {
  const new_cartItems = [];
  localStorage.removeItem("cartItems");
  dispatch({
    type: CLEAN_CART,
    payload: new_cartItems,
  });
};
