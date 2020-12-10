import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { getPosts, getUserPosts } from "./actions/posts";
import { getUser } from "./actions/authentication";
import Posts from "./components/Posts/Posts";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav/Nav";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    checkLoggedIn();
  });

  const checkLoggedIn = async () => {
    if (token === null) {
      localStorage.setItem("auth-token", "");
    }

    if (token === "") {
      return null;
    } else {
      const getUserData = jwt_decode(token);
      dispatch(getUser(getUserData.id));
      dispatch(getPosts());
      dispatch(getUserPosts(getUserData.id));
      setIsLoggedIn(true);
    }
  };

  return (
    <Router>
      <Nav
        currentId={currentId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Container maxWidth="md">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                checkLoggedIn={checkLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <Register {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          />
          {isLoggedIn ? (
            <>
              <Route
                exact
                path="/posts"
                render={(props) => (
                  <Posts {...props} setCurrentId={setCurrentId} />
                )}
              />
              <Route
                exact
                path="/profile"
                render={(props) => (
                  <Profile
                    {...props}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                )}
              />
            </>
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )}
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
