import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom"; // Import HashRouter
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./styles/global.scss";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Frontend API Key. Set REACT_APP_CLERK_FRONTEND_API in your .env file.");
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Router> {/* Wrap App with HashRouter */}
      <App />
    </Router>
  </ClerkProvider>
);