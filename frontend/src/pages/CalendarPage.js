import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";
import "../styles/CalendarPage.scss";

function CalendarPage() {
  const { userId } = useAuth(); // User ID from authentication
  const [events, setEvents] = useState([]);

  const loadUserEvents = () => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    const userEvents = allCalendars[userId]?.events || [];
    setEvents(userEvents);
  };

  useEffect(() => {
    loadUserEvents();
  }, [userId]);

  const handleEventsChange = (updatedEvents) => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    allCalendars[userId] = { events: updatedEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    setEvents(updatedEvents);
  };

  const handleJoinCalendars = () => {
    loadUserEvents(); // Reload events after joining a friend's calendar
  };

  return (
    <div className="calendar-page">
      <NavBar />
      <div className="calendar-content">
        <Sidebar events={events} />
        <div className="calendar-wrapper">
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
