import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddFriendModal from "../components/AddFriendModal";
import ToggleSwitch from "../components/ToggleSwitch";
import "../styles/FriendsPage.scss";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true); // Track view state

  // Load friends from localStorage when the component mounts
  useEffect(() => {
    const storedFriends = localStorage.getItem("friends");
    if (storedFriends) {
      setFriends(JSON.parse(storedFriends)); // Parse and set the friends list
    }
  }, []);

  // Save friends to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addFriend = (friend) => {
    if (!friends.some((f) => f.id === friend.id)) {
      setFriends([...friends, friend]); // Add the new friend without duplicates
    }
    closeModal();
  };

  const toggleView = (checked) => setIsGridView(checked); // Toggle between views

  return (
    <div className="friends-page">
      <NavBar />
      <main className="content">
        <div className="header">
          <h1>Your Friends</h1>
          <div className="action-container">
            <ToggleSwitch
              id="viewToggle"
              checked={isGridView}
              onChange={toggleView}
              optionLabels={["Grid", "List"]}
            />
            <button className="add-friend-button" onClick={openModal}>
              Add Friend
            </button>
          </div>
        </div>
        <div className={`friends-grid ${isGridView ? "grid-view" : "list-view"}`}>
          {friends.map((friend) => (
            <div className="friend-card" key={friend.id}>
              <div className="avatar">
                {friend.imageUrl ? (
                  <img src={friend.imageUrl} alt={friend.name} />
                ) : (
                  <div className="placeholder-avatar">
                    {friend.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <p className="friend-name">{friend.name}</p>
            </div>
          ))}
        </div>
      </main>
      {isModalOpen && <AddFriendModal onClose={closeModal} onAddFriend={addFriend} />}
      <Footer />
    </div>
  );
}

export default FriendsPage;