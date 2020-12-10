import axios from "axios";

const url = "https://x-plor.herokuapp.com";

// USER POSTS endpoints
export const fetchPosts = () => axios.get(`${url}/posts`);
export const getUserPosts = (id) => axios.get(`${url}/posts/${id}`);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
export const likePost = (id) => axios.patch(`${url}/posts/${id}/likePost`);

// USER AUTHENTICATION endpoints
export const registerUser = (newUser) => axios.post(`${url}/register`, newUser);
export const loginUser = (currentUser) =>
  axios.post(`${url}/login`, currentUser);
export const getUser = (id) => axios.get(`${url}/user/${id}`);
