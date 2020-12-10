import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Box,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import xplor from "../../images/xplor.png";
import useStyles from "./styles";
import { LOGIN } from "../../constants/actionTypes";
import * as api from "../../api";
import { useHistory } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  // Checks database for user. if true, Sets redux store with user data and pushes route to /profile.

  const loginUser = async (user) => {
    try {
      const { data } = await api.loginUser(user);
      localStorage.setItem("auth-token", data.token);
      dispatch({ type: LOGIN, payload: data });
      setIsLoggedIn(true);
      history.push("/profile");
    } catch (err) {
      if (Object.keys(err.response.data)[0] === "email") {
        alert(err.response.data.email);
      } else if (Object.keys(err.response.data)[0] === "password") {
        alert(err.response.data.password);
      }
    }
  };

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={xplor} alt="xplor" className={classes.logo} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          Coded By:{" "}
          <span>
            <a
              href="https://github.com/ggmele1"
              rel="noopener noreferrer"
              target="_blank"
            >
              Giuseppe Mele{" "}
            </a>{" "}
            {new Date().getFullYear()}
          </span>
        </Typography>
      </Box>
    </Container>
  );
};
export default Login;
