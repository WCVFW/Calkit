require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { pool, init } = require("./db");
const { authMiddleware } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

app.use(cors());
app.use(express.json());

init().then(() => console.log("DB initialized")).catch((e) => console.error("DB init error", e));

// Optional email transporter (dev friendly)
const transporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : null;

function randomCode() {
  return (Math.floor(100000 + Math.random() * 900000)).toString();
}

// Signup: name, email, phone, password
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, phone, password } = req.body || {};
  if (!email || !password || !name || !phone)
    return res.status(400).json({ error: "Name, email, phone, password required" });
  try {
    const [u] = await pool.query("SELECT id FROM users WHERE email=? OR phone=?", [email, phone]);
    if (u.length > 0) return res.status(400).json({ error: "Email or phone already registered" });
    const hash = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (name, email, phone, password_hash, is_verified) VALUES (?,?,?,?,0)", [name, email, phone, hash]);

    const code = randomCode();
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    await pool.query("INSERT INTO email_otps (email, code, expires_at) VALUES (?,?,?)", [email, code, expires]);

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: "Verify your email",
          html: `<p>Hello ${name},</p><p>Your verification code is <b>${code}</b>. It expires in 15 minutes.</p>`,
        });
      } catch (e) {
        console.warn("Email send failed (dev):", e.message);
      }
    }
    console.log("[DEV] Email OTP for", email, "=", code);
    res.json({ message: "Signup successful. Verification code sent to email." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify email
app.post("/api/auth/verify-email", async (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ error: "Email and code required" });
  try {
    const [rows] = await pool.query("SELECT id, expires_at FROM email_otps WHERE email=? AND code=? ORDER BY id DESC LIMIT 1", [email, code]);
    if (rows.length === 0) return res.status(400).json({ error: "Invalid code" });
    const rec = rows[0];
    if (new Date(rec.expires_at).getTime() < Date.now()) return res.status(400).json({ error: "Code expired" });
    await pool.query("UPDATE users SET is_verified=1 WHERE email=?", [email]);
    await pool.query("DELETE FROM email_otps WHERE email=?", [email]);
    res.json({ message: "Email verified" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Login with email + password
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });
  try {
    const [rows] = await pool.query("SELECT id, name, email, phone, password_hash, is_verified FROM users WHERE email=?", [email]);
    if (rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    if (!user.is_verified) return res.status(403).json({ error: "Email not verified" });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Phone OTP login: request code
app.post("/api/auth/login-phone", async (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ error: "Phone required" });
  try {
    const code = randomCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query("INSERT INTO phone_otps (phone, code, expires_at) VALUES (?,?,?)", [phone, code, expires]);
    console.log("[DEV] Phone OTP for", phone, "=", code);
    res.json({ message: "OTP sent" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Phone OTP verify
app.post("/api/auth/verify-phone", async (req, res) => {
  const { phone, code } = req.body || {};
  if (!phone || !code) return res.status(400).json({ error: "Phone and code required" });
  try {
    const [rows] = await pool.query("SELECT id, expires_at FROM phone_otps WHERE phone=? AND code=? ORDER BY id DESC LIMIT 1", [phone, code]);
    if (rows.length === 0) return res.status(400).json({ error: "Invalid code" });
    if (new Date(rows[0].expires_at).getTime() < Date.now()) return res.status(400).json({ error: "Code expired" });
    // ensure user exists (create lightweight user if needed)
    const [u] = await pool.query("SELECT id, name, email, phone, is_verified FROM users WHERE phone=?", [phone]);
    let user;
    if (u.length === 0) {
      const placeholder = `user_${phone}`;
      const hash = await bcrypt.hash(randomCode(), 10);
      const result = await pool.query("INSERT INTO users (name, email, phone, password_hash, is_verified) VALUES (?,?,?,?,1)", [placeholder, `${placeholder}@example.com`, phone, hash]);
      const insertId = result[0].insertId;
      user = { id: insertId, name: placeholder, email: `${placeholder}@example.com`, phone };
    } else {
      user = u[0];
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    await pool.query("DELETE FROM phone_otps WHERE phone=?", [phone]);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// Me
app.get("/api/user/me", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, phone, is_verified, created_at FROM users WHERE id=?", [req.userId]);
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// CRM - Leads
app.get("/api/leads", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, service, status, created_at FROM leads WHERE owner_user_id=? ORDER BY id DESC", [req.userId]);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/leads", authMiddleware, async (req, res) => {
  const { name, service, status = "New" } = req.body || {};
  if (!name) return res.status(400).json({ error: "Lead name required" });
  try {
    const [result] = await pool.query("INSERT INTO leads (owner_user_id, name, service, status) VALUES (?,?,?,?)", [req.userId, name, service || null, status]);
    res.json({ id: result.insertId, name, service, status });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/leads/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, service, status } = req.body || {};
  try {
    await pool.query("UPDATE leads SET name=COALESCE(?, name), service=COALESCE(?, service), status=COALESCE(?, status) WHERE id=? AND owner_user_id=?", [name || null, service || null, status || null, id, req.userId]);
    res.json({ message: "Updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/leads/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM leads WHERE id=? AND owner_user_id=?", [id, req.userId]);
    res.json({ message: "Deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`API listening on ${PORT}`));
