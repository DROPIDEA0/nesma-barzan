// MySQL Database Configuration for Production (Hostinger)
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { users, siteSettings, siteContent, projects, images } from '../drizzle/schema';

let db: ReturnType<typeof drizzle> | null = null;
let connection: mysql.Connection | null = null;
let rawConnection: mysql.Connection | null = null;

// Test MySQL connection
export async function testMySQLConnection(config: any) {
  console.log('[MySQL] Testing connection...');
  console.log('[MySQL] Config:', {
    host: config.host,
    port: config.port,
    socketPath: config.socketPath,
    user: config.user,
    database: config.database,
    hasPassword: !!config.password
  });
  try {
    const testConnection = await mysql.createConnection(config);
    // Test with a simple query
    await testConnection.query('SELECT 1');
    await testConnection.end();
    console.log('[MySQL] Connection test successful ✓');
    return true;
  } catch (error: any) {
    console.error('[MySQL] Connection test failed:');
    console.error('[MySQL] Error code:', error.code);
    console.error('[MySQL] Error message:', error.message);
    return false;
  }
}

export async function initializeMySQL() {
  try {
    // Import ENV for fallback values
    const { ENV } = await import('./_core/env');
    
    // Check for DATABASE_URL first (Hostinger provides this)
    const DATABASE_URL = process.env.DATABASE_URL;
    
    // Check for individual environment variables from process.env
    const hasIndividualEnvVars = process.env.DB_HOST || process.env.DB_USER || process.env.DB_PASSWORD || process.env.DB_NAME;
    
    let config: any;
    
    // Priority 1: Use DATABASE_URL if available
    if (DATABASE_URL) {
      console.log('[MySQL] Using DATABASE_URL from environment');
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
        // Fall through to try individual variables
      }
    }
    
    // Priority 2: Use individual environment variables if DATABASE_URL parsing failed or not available
    if (!config && hasIndividualEnvVars) {
      console.log('[MySQL] Using individual environment variables');
      const DB_HOST = process.env.DB_HOST || ENV.DB_HOST;
      const DB_PORT = process.env.DB_PORT || ENV.DB_PORT;
      const DB_USER = process.env.DB_USER || ENV.DB_USER;
      const DB_PASSWORD = process.env.DB_PASSWORD || ENV.DB_PASSWORD;
      const DB_NAME = process.env.DB_NAME || ENV.DB_NAME;
      
      config = {
        host: DB_HOST,
        port: parseInt(DB_PORT),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        charset: 'utf8mb4',
      };
    }
    
    // Priority 3: Use hardcoded fallback values for Hostinger with socket
    if (!config) {
      console.log('[MySQL] Using hardcoded fallback values with socket');
      config = {
        socketPath: '/var/lib/mysql/mysql.sock',
        user: 'u521934522_nasma_db_new',
        password: 'Downy144168@144168',
        database: 'u521934522_nasma_db',
        charset: 'utf8mb4',
      };
    }
    
    // Test connection first
    console.log('[MySQL] Testing connection before initialization...');
    let isConnected = await testMySQLConnection(config);
    
    // If TCP connection fails, try socket connection
    if (!isConnected && config.host) {
      console.log('[MySQL] TCP connection failed, trying socket connection...');
      config = {
        socketPath: '/var/lib/mysql/mysql.sock',
        user: config.user,
        password: config.password,
        database: config.database,
        charset: 'utf8mb4',
      };
      isConnected = await testMySQLConnection(config);
    }
    
    if (!isConnected) {
      console.error('[MySQL] All connection attempts failed, aborting initialization');
      return null;
    }
    
    connection = await mysql.createConnection(config);
    rawConnection = await mysql.createConnection(config);

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

// Export db and connection for direct use
export { db, connection };

// Get raw MySQL connection for raw SQL queries
export async function getMySQLConnection() {
  if (!rawConnection) {
    await initializeMySQL();
  }
  return rawConnection;
}
