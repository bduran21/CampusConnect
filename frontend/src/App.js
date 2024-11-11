import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}

export default App;