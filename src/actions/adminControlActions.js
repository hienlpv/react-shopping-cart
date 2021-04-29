import { CHOOSE_TABLE } from "../types";

export const chooseTable = (tableName) => (dispatch) => {
  dispatch({
    type: CHOOSE_TABLE,
    payload: tableName,
  });
};
