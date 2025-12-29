// MySQL Database Configuration for Production (Hostinger)
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { users, siteSettings, siteContent, projects, images } from '../drizzle/schema';

let db: ReturnType<typeof drizzle> | null = null;
let connection: mysql.Connection | null = null;

export async function initializeMySQL() {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    
    if (!DATABASE_URL) {
      console.error('[MySQL] DATABASE_URL is not defined');
      return null;
    }

    // Parse DATABASE_URL
    // Format: mysql://username:password@host:port/database
    const url = new URL(DATABASE_URL);
    
    connection = await mysql.createConnection({
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading /
      charset: 'utf8mb4',
    });

    db = drizzle(connection);

    console.log('[MySQL] Connected successfully');
    
    // Initialize tables if needed
    await initializeTables();
    
    return db;
  } catch (error) {
    console.error('[MySQL] Connection error:', error);
    return null;
  }
}

async function initializeTables() {
  if (!db) return;

  try {
    // Check if tables exist by trying to select from them
    await db.select().from(users).limit(1);
    console.log('[MySQL] Tables already exist');
  } catch (error) {
    console.log('[MySQL] Tables need to be created - please import the SQL file');
  }
}

export async function getDb() {
  if (!db) {
    db = await initializeMySQL();
  }
  return db;
}

// Export db for direct use
export { db };
