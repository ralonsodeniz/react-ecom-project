import React from "react";
import ReactDOM from "react-dom";
// this is the routing package for react, it is going to allow us to mimic pages in order to have different routes inside our app like in a ssr app
import { BrowserRouter } from "react-router-dom"; // BrowserRouter is going to wrap our application and gives it all of the functionalities of routing the library provides
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
