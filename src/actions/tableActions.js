import {
  FETCH_MARK,
  FETCH_COLOR,
  FETCH_TYPE,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  FETCH_ORDER,
  FETCH_ACCOUNT,
} from "../types";

// -----------------------TABLE MARK-----------------------
export const fetchMark = () => (dispatch) => {
  fetch("api/mark")
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: FETCH_MARK,
        payload: res,
      });
    });
};

// -----------------------TABLE COLOR-----------------------
export const fetchColor = () => (dispatch) => {
  fetch("api/color")
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: FETCH_COLOR,
        payload: res,
      });
    });
};

// -----------------------TABLE TYPE-----------------------
export const fetchType = () => (dispatch) => {
  fetch("api/type")
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: FETCH_TYPE,
        payload: res,
      });
    });
};

// -----------------------TABLE ORDER-----------------------
export const fetchOrder = () => (dispatch) => {
  fetch("api/order")
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: FETCH_ORDER,
        payload: res,
      });
    });
};

export const addOrder = (data) => async (dispatch) => {
  let res = await fetch("/api/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: ADD_ORDER,
      payload: result,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  let res = await fetch("/api/order/" + id + "", {
    method: "Delete",
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: DELETE_ORDER,
      payload: result,
    });
  }
};

export const editOrder = (data) => async (dispatch) => {
  let res = await fetch("/api/order/update", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: EDIT_ORDER,
      payload: result,
    });
  }
};
// -----------------------TABLE ORDER-----------------------
export const fetchAccount = () => (dispatch) => {
  fetch("/api/account")
    .then((res) => res.json())
    .then((res) => {
      dispatch({
        type: FETCH_ACCOUNT,
        payload: res,
      });
    });
};
