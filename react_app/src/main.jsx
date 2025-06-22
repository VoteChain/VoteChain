import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import NearProvider from "./contexts/NearContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NearProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NearProvider>
  </StrictMode>
);
