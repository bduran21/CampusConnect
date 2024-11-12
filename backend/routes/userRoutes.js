const express = require("express");
const router = express.Router();
const { createClerkClient } = require("@clerk/clerk-sdk-node");

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    // Fetch users from Clerk API
    const response = await clerk.users.getUserList();

    // Ensure the response contains the `data` array
    const allUsers = response?.data;

    if (!Array.isArray(allUsers)) {
      throw new Error("Unexpected response format from Clerk API");
    }

    // Filter users by name
    const filteredUsers = allUsers.filter((user) => {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });

    // Map results to required fields
    const results = filteredUsers.map((user) => ({
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      imageUrl: user.imageUrl || "https://via.placeholder.com/40", // Use Clerk imageUrl if present
    }));

    res.json(results);
  } catch (error) {
    console.error("Error searching users:", error.message, error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;