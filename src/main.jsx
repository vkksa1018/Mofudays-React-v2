import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // 引入Bootstrap 樣式 by 納森
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 引入Bootstrap JS  by 納森
// main.jsx
import "bootstrap-icons/font/bootstrap-icons.css"; // 引入Bootstrap Icon  by James
import App from "./App";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/mofudays-react">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
