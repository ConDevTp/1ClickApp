import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/Theme.css";
import "./Styles/BaseUI.css";
import "./Assets/Css/Fonts.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
