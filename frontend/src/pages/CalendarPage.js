import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import "../styles/CalendarPage.scss";

function CalendarPage() {
  const { userId } = useAuth(); // Retrieve user ID from Clerk
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = () => {
      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      const userEvents = allCalendars[userId]?.events || [];
      setEvents(userEvents); // Only set user's events here
    };

    loadEvents();
  }, [userId]);

  const handleEventsChange = (updatedEvents) => {
    setEvents(updatedEvents);

    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    allCalendars[userId] = { events: updatedEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
  };

  return (
    <div className="calendar-page">
      <NavBar />
      <div className="calendar-content">
        <Sidebar events={events} />
        <div className="calendar-wrapper">
          <h1>My Calendar</h1>
          <Calendar
            userId={userId}
            isEditable={true}
            currentView="timeGridWeek"
            events={events}
            onEventsChange={handleEventsChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CalendarPage;
