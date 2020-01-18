import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/store";
import App from "./App";

import './reset.css'
import "./index.css";

ReactDOM.render(
  <ReduxProvider store={store()}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
