import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "../styles/NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Redirect logo based on sign-in status */}
        <SignedIn>
          <Link href="/calendar" className="logo">Campus Connect</Link>
        </SignedIn>
        <SignedOut>
          <Link href="/" className="logo">Campus Connect</Link>
        </SignedOut>
        <Link to="/" className="logo">Campus Connect</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/friends" className="nav-link">Friends</Link>
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/about-us" className="nav-link">About Us</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
