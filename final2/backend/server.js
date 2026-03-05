const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ─────────────────────────────

app.use(cors()); // allow all origins for now
app.use(express.json());

// ─── In-memory "database" ───────────────────

const VALID_CREDENTIALS = {
  username: "admin",
  password: "admin",
};

// ─── Routes ─────────────────────────────────

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  if (
    username === VALID_CREDENTIALS.username &&
    password === VALID_CREDENTIALS.password
  ) {
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      username,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password.",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ─── Start Server ───────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});