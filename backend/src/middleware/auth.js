const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing auth token" });
  const parts = auth.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ error: "Invalid auth format" });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { authMiddleware };
