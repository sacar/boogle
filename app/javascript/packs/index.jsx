import React from "react";
import ReactDOM from "react-dom";
import App from "../reactapp/App";
import "bootstrap/dist/css/bootstrap.css";
import configureStore from "../reactapp/redux/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
