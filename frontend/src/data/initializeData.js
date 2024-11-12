// src/data/initializeData.js

export const initializeUserData = () => {
    const initialData = {
      alex: {
        events: [
          { id: "1", title: "Team Meeting", start: "2024-11-12T10:00:00" },
          { id: "2", title: "Project Review", start: "2024-11-14T14:00:00" },
          { id: "3", title: "Coffee with Client", start: "2024-11-15T09:00:00" },
        ],
      },
      user_2oj2OZd74yZZawPPvxQHX7CPWvC: {
        events: [
          { id: "1", title: "Gym Session", start: "2024-11-12T19:00:00" },
          { id: "2", title: "Code Review", start: "2024-11-13T11:00:00" },
          { id: "3", title: "Team Dinner", start: "2024-11-14T18:00:00" },
        ],
      },
      isabella: {
        events: [
          { id: "1", title: "Yoga Class", start: "2024-11-13T07:00:00" },
          { id: "2", title: "Design Workshop", start: "2024-11-15T12:00:00" },
          { id: "3", title: "Art Exhibition", start: "2024-11-16T15:00:00" },
        ],
      },
      chave: {
        events: [
          { id: "1", title: "Parent-Teacher Conference", start: "2024-11-12T08:00:00" },
          { id: "2", title: "Cooking Class", start: "2024-11-14T16:00:00" },
          { id: "3", title: "Book Club", start: "2024-11-17T18:00:00" },
        ],
      },
      steven: {
        events: [
          { id: "1", title: "Soccer Practice", start: "2024-11-12T17:00:00" },
          { id: "2", title: "Volunteer Event", start: "2024-11-13T14:00:00" },
          { id: "3", title: "Gaming Night", start: "2024-11-14T20:00:00" },
        ],
      },
    };
  
    // Set initial data in localStorage if not already present
    if (!localStorage.getItem("all-calendars")) {
      localStorage.setItem("all-calendars", JSON.stringify(initialData));
    }
  };