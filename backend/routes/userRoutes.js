const express = require("express");
const { Clerk } = require("@clerk/clerk-sdk-node");

const router = express.Router();

// Initialize Clerk with the secret key
const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

// Route to search users by name
router.get("/search", async (req, res) => {
  const query = req.query.q; // The search query from the frontend
  try {
    const users = await clerk.users.getUserList({
      query,
      limit: 10, // Limit the number of results
    });
    res.json(users.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.profileImageUrl,
    })));
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Failed to search users" });
  }
});

module.exports = router;