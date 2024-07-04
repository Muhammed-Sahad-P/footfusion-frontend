import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CollectionProvider } from "./Context/CollectionContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import ContextAdmin from "./Admin/AdminContext/AdminContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <UserContextProvider>
          <ContextAdmin>
            <App />
          </ContextAdmin>
        </UserContextProvider>
      </CollectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
