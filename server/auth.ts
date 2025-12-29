import bcrypt from "bcryptjs";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Authenticate a user with username and password
 * Updated: 2025-12-30
 */
export async function authenticateUser(username: string, password: string) {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[Auth] Database not available");
      return null;
    }
    
    // Find user by username
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    const user = result.length > 0 ? result[0] : null;

    if (!user || !user.password) {
      return null;
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

/**
 * Create default admin user if not exists
 */
export async function createDefaultAdmin() {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[Auth] Database not available");
      return;
    }
    
    // Check if any admin exists
    const result = await db.select().from(users).where(eq(users.role, "admin")).limit(1);
    const existingAdmin = result.length > 0 ? result[0] : null;

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create default admin
    const hashedPassword = await hashPassword("admin123");
    await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
      name: "Administrator",
      email: "admin@nesmabarzan.com",
      role: "admin",
      loginMethod: "password",
    });

    console.log("Default admin user created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}
