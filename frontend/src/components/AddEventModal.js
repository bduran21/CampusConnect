import React, { useState } from 'react';

function AddEventModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    if (title && date) {
      onSave({ title, start: date });
      onClose();
    } else {
      alert('Please provide both title and date!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddEventModal;
