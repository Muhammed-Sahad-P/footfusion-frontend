import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CollectionProvider } from "./Context/CollectionContext.jsx";
import {  UserContextProvider } from "./Context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </CollectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
