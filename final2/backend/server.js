const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ─── In-memory "database" ────────────────────────────────────────────────────

const VALID_CREDENTIALS = {
  username: "admin",
  password: "admin",
};

// ─── Routes ──────────────────────────────────────────────────────────────────

/**
 * POST /login
 * Body: { username: string, password: string }
 * 200 → credentials valid, returns { success: true, username }
 * 400 → missing fields
 * 401 → invalid credentials
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  // Validate credentials
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

// ─── Health check ─────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅  Login API running at http://localhost:${PORT}`);
});

module.exports = app;
