export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // hex
  salt: string;         // hex
  role: string;
  createdAt: string;
}

const STORAGE_KEY = "dev_users_db";

/* utilitaires hex <-> ArrayBuffer */
function bufToHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}
function hexToBuf(hex: string) {
  const length = hex.length / 2;
  const u8 = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    u8[i] = parseInt(hex.substr(i*2, 2), 16);
  }
  return u8.buffer;
}

/* crée un salt aléatoire (16 bytes) */
function genSaltHex() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(salt).map(b => b.toString(16).padStart(2, "0")).join("");
}

/* hash password + salt via SHA-256 -> hex */
async function hashPasswordHex(password: string, saltHex: string) {
  const saltBuf = hexToBuf(saltHex);
  const enc = new TextEncoder();
  const pwBuf = enc.encode(password);
  // concat pw + salt
  const combo = new Uint8Array(pwBuf.byteLength + saltBuf.byteLength);
  combo.set(new Uint8Array(pwBuf), 0);
  combo.set(new Uint8Array(saltBuf), pwBuf.byteLength);
  const hashBuf = await crypto.subtle.digest("SHA-256", combo.buffer);
  return bufToHex(hashBuf);
}

/* CRUD minimal localStorage */
function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/* API */

/** crée un utilisateur ; rejette si email déjà utilisé */
export async function createUser(payload: { name: string; email: string; password: string; role?: string; }) {
  const users = loadUsers();
  const emailLower = payload.email.trim().toLowerCase();
  if (users.some(u => u.email === emailLower)) {
    throw new Error("Email already registered");
  }
  const salt = genSaltHex();
  const passwordHash = await hashPasswordHex(payload.password, salt);
  const newUser: StoredUser = {
    id: Date.now().toString(),
    name: payload.name,
    email: emailLower,
    passwordHash,
    salt,
    role: payload.role ?? "user",
    createdAt: new Date().toISOString()
  };
  users.unshift(newUser);
  saveUsers(users);
  // on renvoie l'utilisateur sans mot de passe
  const { passwordHash: _ph, salt: _s, ...safe } = newUser;
  return safe as Omit<StoredUser, "passwordHash" | "salt">;
}

/** authentifie : retourne l'utilisateur (sans hash/salt) ou null */
export async function authenticate(email: string, password: string) {
  const users = loadUsers();
  const emailLower = email.trim().toLowerCase();
  const found = users.find(u => u.email === emailLower);
  if (!found) return null;
  const candidateHash = await hashPasswordHex(password, found.salt);
  if (candidateHash === found.passwordHash) {
    const { passwordHash: _ph, salt: _s, ...safe } = found;
    return safe as Omit<StoredUser, "passwordHash" | "salt">;
  }
  return null;
}

/** utilitaires pour debug / admin */
export function listUsersPublic() {
  return loadUsers().map(u => {
    const { passwordHash: _ph, salt: _s, ...safe } = u;
    return safe;
  });
}

export function clearUsersStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
