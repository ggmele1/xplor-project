import React from "react";
import ReactDOM from "react-dom";
import "./globalStyles.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import MyTheme from "./MyTheme";
import { ThemeProvider } from "@material-ui/styles";

import { reducers } from "./reducers";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={MyTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
