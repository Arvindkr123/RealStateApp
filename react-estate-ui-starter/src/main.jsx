import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContextPorvider } from "./context/Auth.Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextPorvider>
      <App />
    </AuthContextPorvider>
  </React.StrictMode>
);
