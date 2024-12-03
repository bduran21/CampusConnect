import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal";
import "../styles/Calendar.scss";

function Calendar({ userId, isEditable = true, currentView = "timeGridWeek", events: propEvents }) {
  const [events, setEvents] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  // Load events for the given user
  useEffect(() => {
    if (propEvents && propEvents.length > 0) {
      setEvents(propEvents);
    } else {
      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      if (allCalendars[userId]) {
        setEvents(allCalendars[userId].events);
      }
    }
  }, [userId, propEvents]);

  const handleAddEvent = (newEvent) => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    const updatedEvents = [
      ...events,
      { ...newEvent, id: Date.now().toString(), backgroundColor: newEvent.backgroundColor }, // Ensure color is passed
    ];

    allCalendars[userId] = { events: updatedEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    setEvents(updatedEvents);
    setAddModalOpen(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );

    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    allCalendars[userId] = { events: updatedEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    setEvents(updatedEvents);
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);

    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    allCalendars[userId] = { events: updatedEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
    setEvents(updatedEvents);
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (info) => {
    if (isEditable) {
      const clickedEvent = events.find((event) => event.id === info.event.id);
      if (clickedEvent) {
        setSelectedEvent(clickedEvent);
        setEditModalOpen(true);
      }
    }
  };

  return (
    <div className="calendar-wrapper">
      {isEditable && (
        <div className="calendar-header">
          <button onClick={() => setAddModalOpen(true)} className="add-event-button">
            Add Event
          </button>
        </div>
      )}

      {isAddModalOpen && (
        <AddEventModal
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddEvent}
        />
      )}

      {isEditModalOpen && selectedEvent && (
        <AddEventModal
          event={selectedEvent}
          onClose={() => setEditModalOpen(false)}
          onSave={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        events={events} // Events include color
        editable={isEditable}
        selectable={isEditable}
        droppable={isEditable}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <div style={{ backgroundColor: eventInfo.event.backgroundColor }}>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </div>
        )}
      />
    </div>
  );
}

export default Calendar;
