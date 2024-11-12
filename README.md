# Campus Connect

Campus Connect is a platform designed to help students connect with their peers, manage events, and foster a sense of community through features like calendars, friend management, and event scheduling.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Friend Management**: Add and view friends dynamically using a modern interface.
- **Custom Calendar**: Schedule, view, and manage events in various calendar views (daily, weekly, and monthly).
- **Dynamic User Data**: Local storage support to simulate different users and events for testing purposes.
- **Event Overlap Detection**: Compare calendars between users and detect overlapping events.
- **Responsive Design**: Fully responsive layout for seamless usage across devices.

## Tech Stack
### Frontend
- **React**: JavaScript library for building user interfaces.
- **FullCalendar.js**: For advanced calendar views and functionality.
- **SCSS**: For modular and maintainable styling.

### Backend
- **LocalStorage**: Used as a temporary database for storing user and event data.
- **Node.JS/Express**: Used as a smalle server and created routes to clerk api

### Development Tools
- **VS Code**: Code editor.
- **Clerk**: For user authentication and management.
- **Git/GitHub**: Version control and repository hosting.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or above)
- npm or yarn
- A modern web browser

### Steps
1. Clone the repository:
   ```bash
   git clone
   cd campus-connect
2. Install Dependencies
    ```bash
    cd into backend
    npm install
    cd into frontend
    npm install
3. Start the development server:
   ```bash
    npm start
4.	Open the application:
    Visit http://localhost:3000 in your browser.