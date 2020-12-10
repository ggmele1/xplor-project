import { LOGIN } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (user = [], action) => {
  switch (action.type) {
    case LOGIN:
      return [...user, action.payload];
    case "LOGOUT":
      return action.payload;
    default:
      return user;
  }
};
