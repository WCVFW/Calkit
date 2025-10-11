require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const { authMiddleware } = require("./middleware/auth");
const { findUserById } = require("./store");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/user/me", authMiddleware, async (req, res) => {
  try {
    const user = findUserById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const { id, email, name, isVerified, createdAt } = user;
    res.json({ id, email, name, isVerified, createdAt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
