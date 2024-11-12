import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddFriendModal from "../components/AddFriendModal";
import "../styles/FriendsPage.scss";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addFriend = (friend) => {
    if (!friends.some((f) => f.id === friend.id)) {
      setFriends([...friends, friend]); // Add the new friend without duplicates
    }
    closeModal();
  };

  return (
    <div className="friends-page">
      <NavBar />
      <main className="content">
        <div className="header">
          <h1>Your Friends</h1>
          <button className="add-friend-button" onClick={openModal}>
            Add Friend
          </button>
        </div>
        <div className="friends-grid">
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