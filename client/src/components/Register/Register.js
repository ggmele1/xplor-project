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
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import xplor from "../../images/xplor.png";
import { LOGIN } from "../../constants/actionTypes";
import * as api from "../../api";

const Register = ({ setIsLoggedIn }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(registerData);
  };

  const registerUser = async (user) => {
    try {
      const { data } = await api.registerUser(user);

      dispatch({ type: LOGIN, payload: data });
      loginUser({ email: registerData.email, password: registerData.password });
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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={xplor} alt="xplor" className={classes.logo} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              autoComplete="name"
              required
              fullWidth
              id="name"
              label="Full Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
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
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Re-enter password"
              type="password"
              id="password2"
              autoComplete="current-password"
              value={registerData.password2}
              onChange={(e) =>
                setRegisterData({ ...registerData, password2: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Coded By: "}
            <a color="inherit" href="https://github.com/ggmele1">
              {"Giuseppe Mele"}
            </a>
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default Register;
