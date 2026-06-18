import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    {
      onRecoverableError: (error, errorInfo) => {
        // console.error("--- HYDRATION MISMATCH FOUND ---");
        // console.error(error);
        // console.error("Component stack trace:", errorInfo.componentStack);
      }
    }
  );
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}