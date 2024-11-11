// src/pages/CalendarPage.js

import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function CalendarPage() {
  return (
    <div>
      <NavBar />
      <main className="content">
        <h1>Calendar</h1>
        <p>This is the calendar page where you can manage your events.</p>
      </main>
      <Footer />
    </div>
  );
}

export default CalendarPage;