import {
  ADD_COLOR,
  CHOOSE_TABLE,
  DELETE_COLOR,
  EDIT_COLOR,
  FETCH_COLOR,
  FETCH_MARK,
  FETCH_TYPE,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  FETCH_ORDER,
  FETCH_ACCOUNT,
} from "../types";

export const tableReducers = (state = {}, action) => {
  switch (action.type) {
    case CHOOSE_TABLE:
      return { ...state, table: action.payload };
    case FETCH_MARK:
      return { ...state, mark: action.payload };
    case FETCH_COLOR:
      return { ...state, color: action.payload };
    case ADD_COLOR:
      return { ...state, color: action.payload };
    case DELETE_COLOR:
      return { ...state, color: action.payload };
    case EDIT_COLOR:
      return { ...state, color: action.payload };
    case FETCH_TYPE:
      return { ...state, type: action.payload };
    case FETCH_ORDER:
      return { ...state, order: action.payload };
    case ADD_ORDER:
      return { ...state, order: action.payload };
    case DELETE_ORDER:
      return { ...state, order: action.payload };
    case EDIT_ORDER:
      return { ...state, order: action.payload };
    case FETCH_ACCOUNT:
      return { ...state, account: action.payload };
    default:
      return state;
  }
};
