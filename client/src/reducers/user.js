import { FETCH_USER_POSTS, DELETE } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (user = [], action) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    default:
      return user;
  }
};
