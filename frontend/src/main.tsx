import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from react-dom/client
import App from "./App";
import "./GeneralStyle.css";

// Add type assertion to ensure the element exists
const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
