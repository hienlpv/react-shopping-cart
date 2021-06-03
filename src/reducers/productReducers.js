import { FETCH_PRODUCTS, FILTER_PRODUCTS } from "../types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filteredItems: action.payload,
      };
    default:
      return state;
  }
};
