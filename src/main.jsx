import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import App from "./App";
import "./styles/global.scss";

window.bootstrap = bootstrap;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
