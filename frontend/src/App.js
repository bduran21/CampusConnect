import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import CalendarPage from "./pages/CalendarPage";
import AboutUsPage from "./pages/AboutUsPage";

import { initializeUserData } from "./data/initializeData";

function App() {
  useEffect(() => {
    initializeUserData(); // Ensure data is initialized in localStorage
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;