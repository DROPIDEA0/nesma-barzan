// MySQL Database Configuration for Production (Hostinger)
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { users, siteSettings, siteContent, projects, images } from '../drizzle/schema';

let db: ReturnType<typeof drizzle> | null = null;
let connection: mysql.Connection | null = null;

export async function initializeMySQL() {
  try {
    // Try individual environment variables first
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || '3306';
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_NAME = process.env.DB_NAME;
    const DATABASE_URL = process.env.DATABASE_URL;
    
    let config: any;
    
    if (DB_USER && DB_PASSWORD && DB_NAME) {
      // Use individual variables
      console.log('[MySQL] Using individual environment variables');
      config = {
        host: DB_HOST,
        port: parseInt(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        charset: 'utf8mb4',
      };
    } else if (DATABASE_URL) {
      // Parse DATABASE_URL
      console.log('[MySQL] Using DATABASE_URL');
      try {
        const url = new URL(DATABASE_URL);
        config = {
          host: url.hostname,
          port: parseInt(url.port) || 3306,
          user: url.username,
          password: decodeURIComponent(url.password),
          database: url.pathname.slice(1),
          charset: 'utf8mb4',
        };
      } catch (urlError) {
        console.error('[MySQL] Failed to parse DATABASE_URL:', urlError);
        return null;
      }
    } else {
      console.error('[MySQL] No database configuration found');
      return null;
    }
    
    connection = await mysql.createConnection(config);

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
