import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Calendar from "../components/Calendar"; // Import the updated Calendar component
import "../styles/CalendarPage.scss";

function CalendarPage() {
  const userId = "alex"; // Hardcoded for testing

  return (
    <div className="calendar-page">
      <NavBar />
      <div className="calendar-content">
        <h1>My Calendar</h1>
        <div className="calendar-wrapper">
          <Calendar userId={userId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CalendarPage;