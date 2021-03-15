import { FETCH_PRODUCTS, FILTER_PRODUCTS, SORT_PRODUCTS } from "../types";

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

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (products, sort) => (dispatch) => {
  const sortedItems = products.slice();
  dispatch({
    type: SORT_PRODUCTS,
    payload: {
      sort: sort,
      items: sortedItems.sort((a, b) =>
        sort === "lowest"
          ? a.price > b.price
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
          ? 1
          : -1
      ),
    },
  });
};
