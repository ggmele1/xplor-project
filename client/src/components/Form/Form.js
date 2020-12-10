import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import "../../globalStyles.css";
import useStyles from "./styles";
import { createPost } from "../../actions/posts";
const Form = ({ currentId, setCurrentId }) => {
  const user = useSelector((state) => state.user[0]);

  const [postData, setPostData] = useState({
    userId: user._id,
    creator: user.name,
    title: "",
    message: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      postData.title.length === 0 &&
      postData.selectedFile.length === 0 &&
      postData.message.length === 0
    ) {
      alert("Cannot post with no data");
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      userId: user._id,
      creator: user.name,
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Create A Post</Typography>
        <TextField
          className={classes.fileInput}
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          className={classes.fileInput}
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            className={classes.addImage}
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
};
export default Form;
