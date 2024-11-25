// src/components/NavBar.js

import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal routing
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "../styles/NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Redirect logo based on sign-in status */}
        <SignedIn>
          <link href="/calendar" className="logo">Campus Connect</link>
        </SignedIn>
        <SignedOut>
          <link href="/" className="logo">Campus Connect</link>
        </SignedOut>
        </div>
        <div className="navbar-right">
          <link href="/" className="nav-link">Home</link>

          <SignedIn>
            <link href="/friends" className="nav-link">Friends</link>
            {/* Calendar link removed for signed-in users */}
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl="/friends" // Redirect to Friends page after sign-in if no `redirect_url` exists
  >
              <button className="nav-link button-link">Friends</button>
            </SignInButton>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl="/calendar" // Redirect to Calendar page after sign-in if no `redirect_url` exists
            >
              <button className="nav-link button-link">Calendar</button>
            </SignInButton>
          </SignedOut>

          <link href="/about-us" className="nav-link">About Us</link>

          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              redirectUrl="/calendar" // Redirect after successful sign-in
              fallbackRedirectUrl="/calendar" // In case no redirectUrl is specified
            >
              <button className="SignIn">Sign In</button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
  );
}

export default NavBar;