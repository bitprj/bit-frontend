import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/store";
import App from "./App";

import "./css/reset.css";
import "./css/index.css";

ReactDOM.render(
  <ReduxProvider store={store()}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
