import React, { useState, useEffect } from "react";
import "../styles/AddFriendModal.scss";
import { useClerk } from "@clerk/clerk-react";

function AddFriendModal({ onClose, onAddFriend }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { client } = useClerk();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchUsers();
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const searchUsers = async () => {
    setLoading(true);

    try {
      const users = await client.users.getUserList({
        query: searchQuery, // Searches by name
        limit: 10, // Limits results to 10 users
      });

      setSearchResults(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }

    setLoading(false);
  };

  const handleAddFriend = (user) => {
    const newFriend = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.profileImageUrl || "",
    };

    onAddFriend(newFriend);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Friend</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {loading && <div className="loading-spinner">Searching...</div>}
        </div>
        {searchResults.length > 0 && (
          <div className="autocomplete-dropdown">
            {searchResults.map((user) => (
              <div
                className="dropdown-item"
                key={user.id}
                onClick={() => handleAddFriend(user)}
              >
                <div className="avatar">
                  {user.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt={user.firstName} />
                  ) : (
                    <div className="placeholder-avatar">
                      {user.firstName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <p className="user-name">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;