// src/data/initializeData.js

export const initializeUserData = () => {
  const initialCalendars = {
    alex: {
      events: [
        { id: "1", title: "Team Meeting", start: "2024-11-26T10:00:00" },
        { id: "2", title: "Project Review", start: "2024-11-27T14:00:00" },
      ],
    },
    isabella: {
      events: [
        { id: "1", title: "Yoga Class", start: "2024-11-25T07:00:00" },
        { id: "2", title: "Design Workshop", start: "2024-11-26T12:00:00" },
      ],
    },
    steven: {
      events: [
        { id: "1", title: "Soccer Practice", start: "2024-11-27T17:00:00" },
        { id: "2", title: "Volunteer Event", start: "2024-11-26T14:00:00" },
      ],
    },
  };

  const initialFriends = [
    {
      id: "isabella",
      name: "Isabella",
      imageUrl: "https://via.placeholder.com/150?text=I",
    },
    {
      id: "steven",
      name: "Steven",
      imageUrl: "https://via.placeholder.com/150?text=S",
    },
  ];

  // Check if data is already initialized
  if (!localStorage.getItem("all-calendars")) {
    localStorage.setItem("all-calendars", JSON.stringify(initialCalendars));
    console.log("Initialized all-calendars:", initialCalendars);
  }

  if (!localStorage.getItem("friends")) {
    localStorage.setItem("friends", JSON.stringify(initialFriends));
    console.log("Initialized friends:", initialFriends);
  }
};
