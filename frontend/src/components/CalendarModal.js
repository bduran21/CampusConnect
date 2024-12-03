import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import "../styles/CalendarModal.scss";

function CalendarModal({ friend, onClose, onJoinCalendars }) {
  const [friendEvents, setFriendEvents] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#4caf50"); // Default color
  const navigate = useNavigate();

  useEffect(() => {
    const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
    setFriendEvents(allCalendars[friend.id]?.events || []);
  }, [friend.id]);

  const handleJoinClick = () => {
    if (window.confirm(`Join ${friend.name}'s calendar with selected color?`)) {
      const allCalendars = JSON.parse(localStorage.getItem("all-calendars")) || {};
      const userId = "alex"; // Replace with actual user ID logic
      const userCalendar = allCalendars[userId] || { events: [] };

      const updatedUserEvents = [
        ...userCalendar.events,
        ...friendEvents.map((event) => ({
          ...event,
          id: `${friend.id}-${event.id}`, // Ensure unique IDs
          title: `${event.title} (From ${friend.name})`,
          backgroundColor: selectedColor, // Apply selected color
        })),
      ];

      allCalendars[userId] = { events: updatedUserEvents };
      localStorage.setItem("all-calendars", JSON.stringify(allCalendars));
      onJoinCalendars(updatedUserEvents);
      alert(`${friend.name}'s calendar has been added to your calendar.`);
      navigate("/calendar"); // Redirect to the main calendar page
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{friend.name}'s Calendar</h2>
        <Calendar userId={friend.id} isEditable={false} events={friendEvents} />
        <div className="color-picker">
          <label htmlFor="event-color">Select Event Color:</label>
          <input
            type="color"
            id="event-color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="close-modal-button">
            Close
          </button>
          <button onClick={handleJoinClick} className="join-calendar-button">
            Join Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;
