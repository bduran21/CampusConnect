import React, { useState, useEffect } from "react";
import "../styles/AddFriendModal.scss";

function AddFriendModal({ onClose, onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      if (friendName.trim() === "") {
        setSearchResults([]);
        return;
      }
  
      setIsLoading(true);
  
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/search?q=${encodeURIComponent(friendName)}`
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const data = await response.json();
        console.log("Search Results:", data); // Debug log
        setSearchResults(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    const debounceTimer = setTimeout(searchUsers, 300); // Debounce for 300ms
    return () => clearTimeout(debounceTimer);
  }, [friendName]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Friend</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for a friend"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />
          {isLoading && <p className="loading-spinner">Searching...</p>}
          <ul className="autocomplete-dropdown">
            {searchResults.map((user) => (
              <li
                className="dropdown-item"
                key={user.id}
                onClick={() => onAddFriend(user)}
              >
                <div className="avatar">
                  {user.imageUrl ? (
                    <img src={user.imageUrl} alt={user.name} />
                  ) : (
                    <div className="placeholder-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="user-name">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;