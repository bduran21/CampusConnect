import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/Calendar.scss";

function Calendar({ userId }) {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState("timeGridWeek"); // Default view: Week
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const calendarRef = useRef(null);

  useEffect(() => {
    // Load events for the user from localStorage
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    if (allCalendars[userId]) {
      setEvents(allCalendars[userId].events);
    }
  }, [userId]);

  const handleViewChange = (newView) => {
    setCurrentView(newView); // Update the current view
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView); // Change the FullCalendar view
  };

  const handleDateChange = (action) => {
    const calendarApi = calendarRef.current.getApi();
    action === "prev" ? calendarApi.prev() : calendarApi.next();
    setCurrentDate(calendarApi.getDate().toISOString());
  };

  return (
    <div className="calendar-wrapper">
      {/* Custom Header */}
      <div className="calendar-header">
        <div className="left-section">
          <div className="date-display">
            {new Date(currentDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="view-dropdown">
            <select
              value={currentView}
              onChange={(e) => handleViewChange(e.target.value)}
              className="custom-dropdown"
            >
              <option value="timeGridWeek">Week</option>
              <option value="dayGridMonth">Month</option>
              <option value="timeGridDay">Day</option>
            </select>
          </div>
        </div>
        <div className="right-section">
          <button
            className="add-event-button"
            onClick={() =>
              alert("Open your add event modal or functionality here!")
            }
          >
            Add Event
          </button>
        </div>
      </div>

      {/* FullCalendar Component */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        initialDate={currentDate}
        events={events}
        editable={true}
        selectable={true}
        droppable={true}
        headerToolbar={false} // Hide default toolbar
        eventAdd={(eventInfo) => {
          const newEvent = {
            id: Date.now().toString(),
            title: eventInfo.event.title,
            start: eventInfo.event.startStr,
          };

          const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
          if (allCalendars[userId]) {
            allCalendars[userId].events.push(newEvent);
            localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
            setEvents([...events, newEvent]);
          }
        }}
        eventClick={(eventClickInfo) => {
          if (window.confirm(`Delete event '${eventClickInfo.event.title}'?`)) {
            const updatedEvents = events.filter(
              (event) => event.id !== eventClickInfo.event.id
            );

            const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
            if (allCalendars[userId]) {
              allCalendars[userId].events = updatedEvents;
              localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
              setEvents(updatedEvents);
            }
          }
        }}
      />
    </div>
  );
}

export default Calendar;