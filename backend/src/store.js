const usersById = new Map();
const usersByEmail = new Map();
let nextId = 1;

function createUser({ email, password, name }) {
  const id = String(nextId++);
  const now = new Date().toISOString();
  const user = {
    id,
    email,
    password,
    name: name || "",
    isVerified: false,
    createdAt: now,
  };
  usersById.set(id, user);
  usersByEmail.set(email, user);
  return { ...user };
}

function findUserByEmail(email) {
  const u = usersByEmail.get(email);
  return u ? { ...u } : null;
}

function findUserById(id) {
  const u = usersById.get(String(id));
  return u ? { ...u } : null;
}

function updateUser(id, data) {
  const key = String(id);
  const existing = usersById.get(key);
  if (!existing) return null;
  const updated = { ...existing, ...data };
  usersById.set(key, updated);
  usersByEmail.set(updated.email, updated);
  return { ...updated };
}

module.exports = { createUser, findUserByEmail, findUserById, updateUser };
