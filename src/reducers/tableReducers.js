import {
  ADD_COLOR,
  ADD_MARK,
  CHOOSE_TABLE,
  DELETE_COLOR,
  DELETE_MARK,
  EDIT_COLOR,
  EDIT_MARK,
  FETCH_COLOR,
  FETCH_MARK,
  ADD_TYPE,
  EDIT_TYPE,
  DELETE_TYPE,
  FETCH_TYPE,
} from "../types";

export const tableReducers = (state = {}, action) => {
  switch (action.type) {
    case CHOOSE_TABLE:
      return { ...state, table: action.payload };
    case FETCH_MARK:
      return { ...state, mark: action.payload };
    case ADD_MARK:
      return { ...state, mark: action.payload };
    case DELETE_MARK:
      return { ...state, mark: action.payload };
    case EDIT_MARK:
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
    case ADD_TYPE:
      return { ...state, type: action.payload };
    case DELETE_TYPE:
      return { ...state, type: action.payload };
    case EDIT_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
};
