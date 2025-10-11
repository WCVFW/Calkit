import axios from "axios";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ok(data, status = 200) {
  return {
    data,
    status,
    statusText: "OK",
    headers: {},
    config: {},
    request: {},
  };
}

function err(status, message) {
  const error = new Error(message || "Request failed");
  error.response = {
    status,
    statusText: message || "Error",
    data: { error: message || "Error" },
    headers: {},
    config: {},
    request: {},
  };
  return Promise.reject(error);
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user) {
  localStorage.setItem("auth_user", JSON.stringify(user));
}

axios.defaults.adapter = async function mockAdapter(config) {
  const url = config.url || "";
  const method = (config.method || "get").toLowerCase();

  if (!url.startsWith("/api/")) {
    // Fallback to a no-op network error to avoid real backend calls
    return err(404, "API disabled in mock mode");
  }

  await sleep(200);

  // Auth endpoints
  if (url === "/api/auth/login" && method === "post") {
    const { email, password } = config.data ? JSON.parse(config.data) : {};
    if (!email || !password) return err(400, "Email and password required");
    const user = getStoredUser() || { id: "1", email, name: "Demo User", isVerified: true, createdAt: new Date().toISOString() };
    setStoredUser(user);
    return ok({ token: "mock-token", user });
  }

  if (url === "/api/auth/signup" && method === "post") {
    const { name, email, password } = config.data ? JSON.parse(config.data) : {};
    if (!email || !password) return err(400, "Email and password required");
    const user = { id: "1", email, name: name || "", isVerified: true, createdAt: new Date().toISOString() };
    setStoredUser(user);
    return ok({ message: "Signup successful (mock)." });
  }

  if (url === "/api/auth/verify-email" && method === "post") {
    return ok({ message: "Email verified (mock)." });
  }

  // User
  if (url === "/api/user/me" && method === "get") {
    const auth = config.headers && (config.headers.Authorization || config.headers.authorization);
    if (!auth) return err(401, "Missing token");
    const user = getStoredUser();
    if (!user) return err(404, "User not found");
    return ok(user);
  }

  // Leads
  if (url === "/api/leads" && method === "get") {
    const leads = [
      { id: 1, name: "Alice", service: "GST Registration", status: "New" },
      { id: 2, name: "Bob", service: "Trademark", status: "In Progress" },
      { id: 3, name: "Charlie", service: "MSME", status: "Closed" },
    ];
    return ok({ leads });
  }

  return err(404, "Endpoint not mocked");
};
