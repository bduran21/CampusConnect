// src/pages/FriendsPage.js

import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function FriendsPage() {
  return (
    <div>
      <NavBar />
      <main className="content">
        <h1>Your Friends</h1>
        <p>This is the friends page!</p>
      </main>
      <Footer />
    </div>
  );
}

export default FriendsPage;