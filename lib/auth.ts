import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Get the password hash from environment variable
function getPasswordHash(): string {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error("ADMIN_PASSWORD_HASH environment variable is not set");
  }
  return hash;
}

// Verify password against stored hash
export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const hash = getPasswordHash();
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

// Hash a password (utility for generating the hash to put in .env)
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Create a simple session token
function generateSessionToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Set the admin session cookie
export async function setAdminSession(): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = Date.now() + SESSION_DURATION;
  const sessionData = JSON.stringify({ token, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000, // maxAge is in seconds
    path: "/",
  });

  return token;
}

// Check if admin session is valid
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return false;
    }

    const session = JSON.parse(sessionCookie.value);

    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      // Clear expired session
      await clearAdminSession();
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Clear the admin session (logout)
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

// Utility to generate a password hash (for use in CLI or setup)
export function generatePasswordHashSync(password: string): string {
  return bcrypt.hashSync(password, 12);
}
