import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";
import AuthProvider from "./Context/AuthContext/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
 <AuthProvider>
   <BrowserRouter>
    <App />
  </BrowserRouter>
 </AuthProvider>
);

