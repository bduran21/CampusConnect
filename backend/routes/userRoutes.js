const express = require("express");
const router = express.Router();
const { createClerkClient } = require("@clerk/clerk-sdk-node");

// Initialize Clerk client
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Search for users by name
router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    // Use Clerk's query parameter for searching users
    const response = await clerk.users.getUserList({ query });
    console.log("Clerk API Response:", response);

    // Access the `data` property, which contains the array of users
    const allUsers = response.data;

    if (!Array.isArray(allUsers)) {
      throw new Error("Unexpected response from Clerk API: `data` is not an array");
    }

    // Map results to return the required fields
    const results = allUsers.map((user) => ({
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      imageUrl: user.profileImageUrl || "/default-avatar.png",
    }));

    res.json(results);
  } catch (error) {
    console.error("Error searching users:", error.message, error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;