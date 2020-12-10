import { LOGIN } from "../constants/actionTypes";

import * as api from "../api";

export const registerUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.registerUser(user);
    dispatch({ type: LOGIN, payload: data });
  } catch (err) {
    let errors = Object.values(err.response.data);
    if (err.response.data === "Email Already exists") {
      alert("Email already exists");
    } else {
      alert(
        errors.map((error) => {
          return `
          - ${error}`;
        })
      );
    }
  }
};

export const logoutUser = (logout) => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT", payload: logout });
  } catch (error) {}
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: "GET_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
