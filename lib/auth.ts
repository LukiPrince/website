import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Get the password from environment variable
// For Edge Runtime, we use a simple comparison (store plain password in env)
// For production, consider using a proper auth service
function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }
  return password;
}

// Verify password - simple comparison for Edge Runtime compatibility
export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const storedPassword = getAdminPassword();
    return password === storedPassword;
  } catch {
    return false;
  }
}

// Create a simple session token using Web Crypto API (Edge compatible)
async function generateSessionToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Set the admin session cookie
export async function setAdminSession(): Promise<string> {
  const token = await generateSessionToken();
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
