import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./lib/mock-api";
import "./styles/globals.css";

// Suppress noisy third-party fetch failures during dev (e.g. FullStory) to avoid breaking HMR
if (import.meta.env.DEV) {
  window.addEventListener("unhandledrejection", (e) => {
    try {
      const reason = e.reason || {};
      const msg = reason && reason.message ? reason.message : "";
      const stack = reason && reason.stack ? reason.stack : "";
      if (
        msg.includes("Failed to fetch") ||
        stack.includes("edge.fullstory.com") ||
        stack.includes("fs.js")
      ) {
        // swallow this specific third-party fetch error in dev
        e.preventDefault();
        console.warn("Suppressed third-party fetch error in dev:", reason);
      }
    } catch (err) {
      // ignore
    }
  });
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
