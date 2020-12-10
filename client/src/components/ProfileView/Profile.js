import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts } from "../../actions/posts";

import Post from "./Post";

const Profile = ({ currentId, setCurrentId }) => {
  const user = useSelector((state) => state.authentication[0]);
  const userPosts = useSelector((state) => state.userPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts(user.id));
  }, []);

  return user.length ? (
    <div>Loading</div>
  ) : (
    <div>
      <h1>ProfilePic</h1>
      <h1>{user.name}</h1>
      <p>Bio: </p>
      {userPosts
        .slice(0)
        .reverse()
        .map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
    </div>
  );
};

export default Profile;
