import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import "../styles/CalendarModal.scss";

function CalendarModal({ friend, onClose }) {
  const [friendEvents, setFriendEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    setFriendEvents(allCalendars[friend.id]?.events || []);
  }, [friend.id]);

  const handleJoinCalendars = () => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    const userId = localStorage.getItem("user-id"); // Replace with actual authenticated user ID
    const userEvents = allCalendars[userId]?.events || [];

    const updatedUserEvents = [
      ...userEvents,
      ...friendEvents.map((event) => ({
        ...event,
        id: `${friend.id}-${event.id}`,
        title: `${event.title} (From ${friend.name})`,
      })),
    ];

    allCalendars[userId] = { events: updatedUserEvents };
    localStorage.setItem("all-calendars", JSON.stringify(allCalendars));

    navigate("/calendar");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{friend.name}'s Calendar</h2>
        <Calendar userId={friend.id} isEditable={false} events={friendEvents} />
        <div className="modal-actions">
          <button onClick={handleJoinCalendars} className="join-calendar-button">
            Join Calendars
          </button>
          <button onClick={onClose} className="close-modal-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;
