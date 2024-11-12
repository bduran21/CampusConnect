require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});