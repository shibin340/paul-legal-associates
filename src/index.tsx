import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
    {
      // This hidden configuration switch forces React 18 to show you exactly what text/tag broke
      onRecoverableError: (error, errorInfo) => {
        console.error("--- HYDRATION MISMATCH FOUND ---");
        console.error(error);
        console.error("Component stack trace:", errorInfo.componentStack);
      }
    }
  );
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}