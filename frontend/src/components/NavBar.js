// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "../styles/NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Campus Connect</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/friends" className="nav-link">Friends</Link>
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/about-us" className="nav-link">About Us</Link>
        
        {/* User button for signed-in users */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Sign-in button for signed-out users with a redirect URL */}
        <SignedOut>
          <SignInButton 
            mode="modal" 
            redirectUrl="https://bduran21.github.io/CampusConnect/#/"
            afterSignInUrl="https://bduran21.github.io/CampusConnect/#/"
            afterSignUpUrl="https://bduran21.github.io/CampusConnect/#/"
          />
        </SignedOut>
      </div>
    </nav>
  );
}

export default NavBar;
