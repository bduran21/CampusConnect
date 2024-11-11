// src/components/NavBar.js

import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "../styles/NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">Campus Connect</a>
      </div>
      <div className="navbar-right">
        <a href="/" className="nav-link">Home</a>
        <a href="/friends" className="nav-link">Friends</a>
        <a href="/calendar" className="nav-link">Calendar</a>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" className="SignIn" />
        </SignedOut>
      </div>
    </nav>
  );
}

export default NavBar;