import { combineReducers } from "redux";
import posts from "./posts";
import authentication from "./authentication";
import userPosts from "./userPosts";
import user from "./user";

export const reducers = combineReducers({
  posts,
  authentication,
  userPosts,
  user,
});
