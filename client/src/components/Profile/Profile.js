import React, { useEffect } from "react";
import Form from "../Form/Form";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";

import Post from "./Post";

const Profile = ({ currentId, setCurrentId }) => {
  const user = useSelector((state) => state.user[0]);

  const userPosts = useSelector((state) =>
    state.posts.filter((p) => p.userId === user._id)
  );

  useEffect(() => {
    console.log("Profile Use Effect");
  }, []);

  const classes = useStyles();
  return !user ? (
    <div>Loading</div>
  ) : (
    <div>
      <h2 className={classes.welcomeText}>Welcome {user.name}.</h2>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <h2 className={classes.welcomeText}>Your Posts</h2>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {userPosts.length ? (
          userPosts
            .slice(0)
            .reverse()
            .map((post) => (
              <Grid key={post._id} item xs={12} sm={6}>
                <Post key={post._id} post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))
        ) : (
          <Typography variant="body1">
            You do not have any post yet. Create one!
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Profile;
