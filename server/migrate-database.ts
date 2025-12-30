/**
 * Database Migration Script
 * يقوم بتحديث قاعدة البيانات لإضافة حقول username و password
 * يدعم كل من MySQL و SQLite
 */

import { getDb } from "./db";
import bcrypt from "bcryptjs";

export async function migrateDatabase() {
  console.log("🔄 Starting database migration...");
  
  try {
    const db = await getDb();
    
    if (!db) {
      console.error("❌ Database connection failed");
      return false;
    }

    console.log("✅ Database connected successfully");

    // Detect database type
    const isMySQL = process.env.NODE_ENV === 'production' && process.env.DATABASE_URL?.startsWith('mysql://');
    console.log(`📊 Database type: ${isMySQL ? 'MySQL' : 'SQLite'}`);

    if (isMySQL) {
      // MySQL Migration
      await migrateMySQLDatabase(db);
    } else {
      // SQLite Migration
      await migrateSQLiteDatabase(db);
    }

    console.log("✅ Database migration completed successfully!");
    return true;

  } catch (error) {
    console.error("❌ Database migration failed:", error);
    return false;
  }
}

async function migrateMySQLDatabase(db: any) {
  console.log("🔧 Running MySQL migration...");

  // 1. التحقق من وجود حقل username
  try {
    const [columns] = await db.execute(`
      SHOW COLUMNS FROM users LIKE 'username'
    `);
    
    if (Array.isArray(columns) && columns.length === 0) {
      await db.execute(`
        ALTER TABLE users 
        ADD COLUMN username VARCHAR(100) UNIQUE
      `);
      console.log("✅ Added 'username' column");
    } else {
      console.log("ℹ️  Column 'username' already exists");
    }
  } catch (error: any) {
    console.error("⚠️  Error checking/adding 'username' column:", error.message);
  }

  // 2. التحقق من وجود حقل password
  try {
    const [columns] = await db.execute(`
      SHOW COLUMNS FROM users LIKE 'password'
    `);
    
    if (Array.isArray(columns) && columns.length === 0) {
      await db.execute(`
        ALTER TABLE users 
        ADD COLUMN password VARCHAR(255)
      `);
      console.log("✅ Added 'password' column");
    } else {
      console.log("ℹ️  Column 'password' already exists");
    }
  } catch (error: any) {
    console.error("⚠️  Error checking/adding 'password' column:", error.message);
  }

  // 3. جعل openId nullable
  try {
    await db.execute(`
      ALTER TABLE users 
      MODIFY COLUMN openId VARCHAR(64) UNIQUE NULL
    `);
    console.log("✅ Modified 'openId' column to be nullable");
  } catch (error: any) {
    console.log("ℹ️  'openId' column already nullable or modification not needed");
  }
}

async function migrateSQLiteDatabase(db: any) {
  console.log("🔧 Running SQLite migration...");

  const Database = require('better-sqlite3');
  const path = require('path');
  // Use the same path as db-sqlite.ts
  const dbPath = path.join(process.cwd(), 'local.db');
  console.log(`📂 Database path: ${dbPath}`);
  const sqlite = new Database(dbPath);

  try {
    // Check if users table exists
    const tableExists = sqlite.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='users'
    `).get();

    if (!tableExists) {
      console.log("⚠️  Users table doesn't exist, creating it...");
      sqlite.exec(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          openId TEXT UNIQUE,
          email TEXT,
          name TEXT,
          avatar TEXT,
          role TEXT DEFAULT 'user',
          username TEXT UNIQUE,
          password TEXT,
          loginMethod TEXT DEFAULT 'oauth',
          createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
          updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
        )
      `);
      console.log("✅ Created users table with username and password columns");
    } else {
      // Check if username column exists
      const columns = sqlite.prepare(`PRAGMA table_info(users)`).all();
      const hasUsername = columns.some((col: any) => col.name === 'username');
      const hasPassword = columns.some((col: any) => col.name === 'password');
      const hasLoginMethod = columns.some((col: any) => col.name === 'loginMethod');

      if (!hasUsername || !hasPassword || !hasLoginMethod) {
        console.log("⚠️  Missing columns detected, recreating table...");
        
        // SQLite doesn't support ALTER TABLE ADD COLUMN with constraints easily
        // So we'll create a new table and copy data
        sqlite.exec(`
          CREATE TABLE users_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            openId TEXT UNIQUE,
            email TEXT,
            name TEXT,
            avatar TEXT,
            role TEXT DEFAULT 'user',
            username TEXT UNIQUE,
            password TEXT,
            loginMethod TEXT DEFAULT 'oauth',
            createdAt INTEGER DEFAULT (strftime('%s', 'now') * 1000),
            updatedAt INTEGER DEFAULT (strftime('%s', 'now') * 1000)
          )
        `);

        // Copy existing data
        sqlite.exec(`
          INSERT INTO users_new (id, openId, email, name, avatar, role, createdAt, updatedAt)
          SELECT id, openId, email, name, avatar, role, createdAt, updatedAt
          FROM users
        `);

        // Drop old table and rename new one
        sqlite.exec(`DROP TABLE users`);
        sqlite.exec(`ALTER TABLE users_new RENAME TO users`);

        console.log("✅ Recreated users table with all required columns");
      } else {
        console.log("ℹ️  All columns already exist");
      }
    }

    // Create default admin user if not exists
    const adminExists = sqlite.prepare(`
      SELECT * FROM users WHERE username = ?
    `).get('admin');

    if (!adminExists) {
      console.log("👤 Creating default admin user...");
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      sqlite.prepare(`
        INSERT INTO users (username, password, role, loginMethod, email, name)
        VALUES (?, ?, 'admin', 'local', 'admin@nesmabarzan.com', 'Administrator')
      `).run('admin', hashedPassword);

      console.log("✅ Default admin user created (username: admin, password: admin123)");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    sqlite.close();
    console.log("✅ SQLite migration completed");

  } catch (error: any) {
    console.error("❌ SQLite migration error:", error);
    sqlite.close();
    throw error;
  }
}

// Migration is called automatically from server/_core/index.ts
// No need to run it when this file is imported directly
