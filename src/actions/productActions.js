import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => (dispatch) => {
  fetch("api/products")
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res,
      });
    });
};
