import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducers } from "./reducers/cartReducers";
import { productsReducer } from "./reducers/productReducers";
import { tableReducers } from "./reducers/tableReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    table: tableReducers,
    products: productsReducer,
    cart: cartReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
