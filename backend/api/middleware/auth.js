const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || "";
  const parts = auth.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    try {
      const payload = jwt.verify(parts[1], JWT_SECRET);
      req.userId = payload.userId;
      return next();
    } catch (e) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
  return res.status(401).json({ error: "Missing auth token" });
}

module.exports = { authMiddleware };
