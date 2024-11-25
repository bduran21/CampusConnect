import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import CalendarPage from "./pages/CalendarPage";
import AboutUsPage from "./pages/AboutUsPage";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      {/* Regular Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />

      {/* Clerk Redirect Handling */}
      <Route
        path="/callback"
        element={
          <ClerkProvider>
            <SignedIn>
              <HomePage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ClerkProvider>
        }
      />
    </Routes>
  );
}

export default App;
