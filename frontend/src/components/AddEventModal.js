import React, { useState } from "react";
import "../styles/AddEventModal.scss";

function AddEventModal({ event, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.start || "");
  const [duration, setDuration] = useState(event ? (new Date(event.end) - new Date(event.start)) / 60000 : 15);
  const [color, setColor] = useState(event?.backgroundColor || "#3b82f6");

  const handleSave = () => {
    if (title && date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate.getTime() + duration * 60000);

      const newEvent = {
        ...event,
        id: event?.id || Date.now().toString(),
        title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        backgroundColor: color,
      };

      onSave(newEvent);
      onClose();
    } else {
      alert("Please provide a title, date, and duration!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{event ? "Edit Event" : "Add New Event"}</h2>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            {[15, 30, 45, 60, 90, 120].map((min) => (
              <option key={min} value={min}>
                {min} minutes
              </option>
            ))}
          </select>
        </div>
        <div className="form-group color-group">
          <label>Event Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          {event && (
            <button className="cancel-button" onClick={() => onDelete(event.id)}>
              Delete
            </button>
          )}
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEventModal;
