import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./styles/global.scss";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk Frontend API Key. Set REACT_APP_CLERK_FRONTEND_API in your .env file."
  );
}

function generateRandomEvents(daysCount = 7) {
  const events = [];
  const now = new Date();
  for (let i = 0; i < daysCount; i++) {
    const start = new Date(now);
    start.setDate(now.getDate() + i);
    start.setHours(9 + i, 0); // Spread events out through the day
    const end = new Date(start);
    end.setHours(start.getHours() + 1);
    events.push({
      id: `event-${i}`,
      title: `Event ${i + 1}`,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
  }
  return events;
}

function initializeDemoFriends() {
  const demoFriends = [
    { id: "friend1", name: "Alice Demo", imageUrl: "https://via.placeholder.com/40" },
    { id: "friend2", name: "Bob Demo", imageUrl: "https://via.placeholder.com/40" },
    { id: "friend3", name: "Charlie Demo", imageUrl: "https://via.placeholder.com/40" },
  ];

  const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
  const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};

  demoFriends.forEach((friend) => {
    if (!storedFriends.some((f) => f.id === friend.id)) {
      storedFriends.push(friend);
      allCalendars[friend.id] = { events: generateRandomEvents() };
    }
  });

  localStorage.setItem("friends", JSON.stringify(storedFriends));
  localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
}

initializeDemoFriends();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
