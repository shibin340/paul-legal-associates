import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;

// Check if react-snap has already pre-baked the static HTML elements into the DOM
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  // Fallback to standard client-side rendering for local development (npm start)
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}