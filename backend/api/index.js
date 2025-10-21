require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool, ensureSchema } = require("./db");
const { sendEmail } = require("./email");
const { sendSms } = require("./sms");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

function generateOtp(len = 6) {
  const min = 10 ** (len - 1);
  const max = 10 ** len - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

function devIncludeCode() {
  return process.env.NODE_ENV !== "production";
}

async function issueToken(user) {
  const payload = { id: user.id, role: user.role, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  return token;
}

function authMiddleware(req, res, next) {
  const hdr = req.headers.authorization || req.headers.Authorization;
  if (!hdr || !hdr.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
  const token = hdr.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, name, email, phone, password } = req.body || {};
    const nm = (fullName || name || "").trim();
    const em = String(email || "").trim().toLowerCase();
    const ph = String(phone || "").trim();
    const pw = String(password || "");

    if (!nm || !em || !pw) return res.status(400).json({ error: "Name, email, password required" });
    if (!/\S+@\S+\.\S+/.test(em)) return res.status(400).json({ error: "Invalid email" });
    if (pw.length < 8) return res.status(400).json({ error: "Password too short" });

    const [rows] = await pool.execute("SELECT id FROM users WHERE email=?", [em]);
    if (rows.length) return res.status(409).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(pw, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (email, name, phone, password_hash, is_verified, role) VALUES (?,?,?,?,0,'user')",
      [em, nm, ph || null, hash]
    );

    // Prepare email OTP
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await pool.execute(
      "INSERT INTO otp_codes (kind, target, code, expires_at) VALUES ('email',?,?,?)",
      [em, code, expiresAt]
    );

    // Send email (or log)
    await sendEmail({
      to: em,
      subject: "Your verification code",
      text: `Your verification code is ${code}`,
    });

    const payload = { message: "Signup successful. Check email for OTP." };
    if (devIncludeCode()) payload.code = code;
    return res.json(payload);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Request email OTP
app.post("/api/auth/request-email-otp", async (req, res) => {
  try {
    const { email } = req.body || {};
    const em = String(email || "").trim().toLowerCase();
    if (!/\S+@\S+\.\S+/.test(em)) return res.status(400).json({ error: "Valid email required" });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await pool.execute(
      "INSERT INTO otp_codes (kind, target, code, expires_at) VALUES ('email',?,?,?)",
      [em, code, expiresAt]
    );

    await sendEmail({ to: em, subject: "Your OTP", text: `Your OTP is ${code}` });

    const payload = { message: "OTP sent" };
    if (devIncludeCode()) payload.code = code;
    return res.json(payload);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Verify email
app.post("/api/auth/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body || {};
    const em = String(email || "").trim().toLowerCase();
    const cd = String(code || "").trim();
    if (!em || !cd) return res.status(400).json({ error: "Email and code required" });

    const [rows] = await pool.execute(
      "SELECT id, code, expires_at, consumed FROM otp_codes WHERE kind='email' AND target=? ORDER BY id DESC LIMIT 1",
      [em]
    );
    if (!rows.length) return res.status(400).json({ error: "OTP not found" });
    const otp = rows[0];
    if (otp.consumed) return res.status(400).json({ error: "OTP already used" });
    if (new Date(otp.expires_at).getTime() < Date.now()) return res.status(400).json({ error: "OTP expired" });
    if (String(otp.code) !== cd) return res.status(400).json({ error: "Invalid code" });

    await pool.execute("UPDATE otp_codes SET consumed=1 WHERE id=?", [otp.id]);
    await pool.execute("UPDATE users SET is_verified=1 WHERE email=?", [em]);
    return res.json({ message: "Email verified" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Login (email/password)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const em = String(email || "").trim().toLowerCase();
    const pw = String(password || "");
    if (!em || !pw) return res.status(400).json({ error: "Email and password required" });

    const [rows] = await pool.execute(
      "SELECT id, email, name, phone, password_hash, is_verified, role, created_at FROM users WHERE email=?",
      [em]
    );
    if (!rows.length) return res.status(400).json({ error: "Invalid credentials" });
    const u = rows[0];

    const ok = await bcrypt.compare(pw, u.password_hash || "");
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const user = {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone,
      isVerified: !!u.is_verified,
      role: u.role,
      createdAt: u.created_at,
    };

    const token = await issueToken(user);
    return res.json({ token, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Phone login: request OTP (via SMS)
app.post("/api/auth/login-phone", async (req, res) => {
  try {
    const { phone } = req.body || {};
    const ph = String(phone || "").replace(/[^0-9]/g, "");
    if (!/^[0-9]{7,15}$/.test(ph)) return res.status(400).json({ error: "Valid phone required" });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await pool.execute(
      "INSERT INTO otp_codes (kind, target, code, expires_at) VALUES ('phone',?,?,?)",
      [ph, code, expiresAt]
    );

    await sendSms(ph, `Your OTP is ${code}`);

    const payload = { message: "OTP sent" };
    if (devIncludeCode()) payload.code = code;
    return res.json(payload);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Phone login: verify OTP
app.post("/api/auth/verify-phone", async (req, res) => {
  try {
    const { phone, code } = req.body || {};
    const ph = String(phone || "").replace(/[^0-9]/g, "");
    const cd = String(code || "");
    if (!ph || !cd) return res.status(400).json({ error: "Phone and code required" });

    const [rows] = await pool.execute(
      "SELECT id, code, expires_at, consumed FROM otp_codes WHERE kind='phone' AND target=? ORDER BY id DESC LIMIT 1",
      [ph]
    );
    if (!rows.length) return res.status(400).json({ error: "OTP not found" });
    const otp = rows[0];
    if (otp.consumed) return res.status(400).json({ error: "OTP already used" });
    if (new Date(otp.expires_at).getTime() < Date.now()) return res.status(400).json({ error: "OTP expired" });
    if (String(otp.code) !== cd) return res.status(400).json({ error: "Invalid code" });

    await pool.execute("UPDATE otp_codes SET consumed=1 WHERE id=?", [otp.id]);

    let userRow;
    const [urows] = await pool.execute("SELECT id, email, name, phone, is_verified, role, created_at FROM users WHERE phone=? LIMIT 1", [ph]);
    if (urows.length) {
      userRow = urows[0];
    } else {
      const [result] = await pool.execute(
        "INSERT INTO users (email, name, phone, is_verified, role) VALUES (?,?,?,?, 'user')",
        [null, "Phone User", ph, 1]
      );
      const [newRows] = await pool.execute("SELECT id, email, name, phone, is_verified, role, created_at FROM users WHERE id=?", [result.insertId]);
      userRow = newRows[0];
    }

    const user = {
      id: userRow.id,
      email: userRow.email,
      name: userRow.name,
      phone: userRow.phone,
      isVerified: !!userRow.is_verified,
      role: userRow.role,
      createdAt: userRow.created_at,
    };

    const token = await issueToken(user);
    return res.json({ token, user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Current user
app.get("/api/user/me", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, email, name, phone, is_verified, role, created_at FROM users WHERE id=?",
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    const u = rows[0];
    return res.json({
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone,
      isVerified: !!u.is_verified,
      role: u.role,
      createdAt: u.created_at,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

async function start() {
  try {
    await ensureSchema();
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  } catch (e) {
    console.error("Failed to start server", e);
    process.exit(1);
  }
}

start();
