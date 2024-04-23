import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import ScrollToTop from "./lib/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <ScrollToTop/>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
