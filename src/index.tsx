import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

// Older search results still point to the former hash route for Contact.
// Send those visitors to the current page before the homepage hydrates.
if (window.location.pathname === "/" && /^#\/contact\/?$/i.test(window.location.hash)) {
  window.location.replace(`/contact/${window.location.search}`);
} else if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    {
      onRecoverableError: (error) => {
        console.error("Page hydration recovered from an error:", error);
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
