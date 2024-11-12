import React, { useState, useEffect } from "react";
import "../styles/AddFriendModal.scss";

function AddFriendModal({ onClose, onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (friendName.trim() === "") {
      setSearchResults([]);
      return;
    }

    const searchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/search?q=${friendName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setSearchResults(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchUsers();
  }, [friendName]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Friend</h2>
        <input
          type="text"
          placeholder="Search for a friend"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        <ul className="autocomplete-list">
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => onAddFriend(user)}>
              <img src={user.imageUrl} alt={user.name} />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;