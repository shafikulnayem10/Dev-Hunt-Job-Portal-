import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
// src/main.jsx
import App from './App'; // 👈 Use exact filename case!

import AuthProvider from "./Context/AuthContext/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
 <AuthProvider>
   <BrowserRouter>
    <App />
  </BrowserRouter>
 </AuthProvider>
);

