import {
  ADD_MARK,
  DELETE_MARK,
  EDIT_MARK,
  FETCH_MARK,
  ADD_COLOR,
  DELETE_COLOR,
  EDIT_COLOR,
  FETCH_COLOR,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ADD_TYPE,
  EDIT_TYPE,
  DELETE_TYPE,
  FETCH_TYPE,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  FETCH_ORDER,
} from "../types";
import axios from "axios";

// -----------------------TABLE PRODUCT-----------------------

export const addProducts = (data) => async (dispatch) => {
  var formData = new FormData();
  data.files.forEach((item) => {
    formData.append(Object.keys(item)[0], item[Object.keys(item)[0]]);
  });
  formData.append("title", data.productTitle);
  formData.append("type", data.productType);
  formData.append("image", data.productImage);
  formData.append("mark", data.productMark);
  formData.append("description", data.productDesc);
  formData.append("colors", data.productColor);
  formData.append("price", data.productPrice);

  try {
    const res = await axios.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
  } catch (err) {}
};

export const editProducts = (data) => async (dispatch) => {
  var formData = new FormData();
  data.files.forEach((item) => {
    formData.append(Object.keys(item)[0], item[Object.keys(item)[0]]);
  });
  formData.append("id", data.id);
  formData.append("title", data.productTitle);
  formData.append("type", data.productType);
  formData.append("image", data.productImage);
  formData.append("mark", data.productMark);
  formData.append("description", data.productDesc);
  formData.append("colors", data.productColor);
  formData.append("price", data.productPrice);

  try {
    const res = await axios.post("/api/products/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data,
    });
  } catch (err) {}
};

export const deleteProduct = (id) => async (dispatch) => {
  let res = await fetch("/api/products/" + id + "", {
    method: "Delete",
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: DELETE_PRODUCT,
      payload: result,
    });
  }
};

export const editProduct = (data) => async (dispatch) => {
  let res = await fetch("/api/products/update", {
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
      type: EDIT_PRODUCT,
      payload: result,
    });
  }
};
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

export const addMark = (data) => async (dispatch) => {
  let res = await fetch("/api/mark", {
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
      type: ADD_MARK,
      payload: result,
    });
  }
};

export const deleteMark = (id) => async (dispatch) => {
  let res = await fetch("/api/mark/" + id + "", {
    method: "Delete",
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: DELETE_MARK,
      payload: result,
    });
  }
};

export const editMark = (data) => async (dispatch) => {
  let res = await fetch("/api/mark/update", {
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
      type: EDIT_MARK,
      payload: result,
    });
  }
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

export const addColor = (data) => async (dispatch) => {
  let res = await fetch("/api/color", {
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
      type: ADD_COLOR,
      payload: result,
    });
  }
};

export const deleteColor = (id) => async (dispatch) => {
  let res = await fetch("/api/color/" + id + "", {
    method: "Delete",
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: DELETE_COLOR,
      payload: result,
    });
  }
};

export const editColor = (data) => async (dispatch) => {
  let res = await fetch("/api/color/update", {
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
      type: EDIT_COLOR,
      payload: result,
    });
  }
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

export const addType = (data) => async (dispatch) => {
  let res = await fetch("/api/type", {
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
      type: ADD_TYPE,
      payload: result,
    });
  }
};

export const deleteType = (id) => async (dispatch) => {
  let res = await fetch("/api/type/" + id + "", {
    method: "Delete",
  });
  let result = await res.json();
  if (result) {
    dispatch({
      type: DELETE_TYPE,
      payload: result,
    });
  }
};

export const editType = (data) => async (dispatch) => {
  let res = await fetch("/api/type/update", {
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
      type: EDIT_TYPE,
      payload: result,
    });
  }
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
