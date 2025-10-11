const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_TOKEN_SECRET = process.env.EMAIL_TOKEN_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

if (!JWT_SECRET || !EMAIL_TOKEN_SECRET) {
  console.warn("JWT_SECRET or EMAIL_TOKEN_SECRET not set in .env");
}

// Setup nodemailer transport for Gmail (App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    // generate email verification token
    const token = jwt.sign({ userId: user.id }, EMAIL_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const verifyUrl = `${FRONTEND_URL}/verify-otp?token=${encodeURIComponent(token)}`;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Hello ${name || ""},</p>
             <p>Click the link below to verify your email address:</p>
             <p><a href="${verifyUrl}">Verify Email</a></p>
             <p>This link expires in 24 hours.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Signup successful. Verification email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/verify-email
router.post("/verify-email", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token required" });
  try {
    const payload = jwt.verify(token, EMAIL_TOKEN_SECRET);
    const userId = payload.userId;
    await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });
    res.json({ message: "Email verified" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    if (!user.isVerified)
      return res.status(403).json({ error: "Email not verified" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
