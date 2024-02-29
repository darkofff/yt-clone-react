import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import "./hooks/useUbdateDb";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/* 
  <React.StrictMode>
    <App />
  </React.StrictMode> 
*/
