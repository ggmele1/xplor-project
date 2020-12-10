import React from "react";
import useStyles from "./styles";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authentication";
import xplor from "../../images/xplor.png";
const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser([]));
    localStorage.setItem("auth-token", "");
    setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <AppBar className={classes.navBar} color="secondary" position="static">
      <Toolbar>
        <img src={xplor} alt="xplor" className={classes.logo} />

        {isLoggedIn ? (
          <div className={classes.links}>
            <Link to="/posts">
              <Button className={classes.links}>Posts</Button>
            </Link>
            <Link to="/profile">
              <Button className={classes.links}>Profile</Button>
            </Link>
            <Button className={classes.links} onClick={() => handleLogout()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <>
            <Link to="/register">
              <Button className={classes.links}>Register</Button>
            </Link>
            <Link to="/">
              <Button className={classes.links}>Login</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
