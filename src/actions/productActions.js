import { FETCH_PRODUCTS, FILTER_PRODUCTS } from "../types";

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

export const filterProducts = (products, filter) => (dispatch) => {
  let type = filter.type;
  let mark = filter.mark;
  console.log(type);
  if (type.length === 0)
    dispatch({
      type: FILTER_PRODUCTS,
      payload: products,
    });
  else if (!mark)
    dispatch({
      type: FILTER_PRODUCTS,
      payload: products.filter((i) => type.includes(i.type)),
    });
  else
    dispatch({
      type: FILTER_PRODUCTS,
      payload: products.filter((i) => type.includes(i.type) && i.mark === mark),
    });
};

export const searchProducts = (products, keyword) => (dispatch) => {
  let newProducts = products.slice();
  newProducts = newProducts.filter((i) =>
    i.title.toUpperCase().includes(keyword.toUpperCase())
  );
  dispatch({
    type: FILTER_PRODUCTS,
    payload: newProducts,
  });
};
