import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./store/auth-ctx";
import UiProvider from "./store/ui-ctx";
import UserProvider from "./store/user-ctx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <UiProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UiProvider>
    </UserProvider>
  </React.StrictMode>
);
