/**
 * Database Migration Script
 * يقوم بتحديث قاعدة البيانات لإضافة حقول username و password
 */

import { getDb } from "./db";

export async function migrateDatabase() {
  console.log("🔄 Starting database migration...");
  
  try {
    const db = await getDb();
    
    if (!db) {
      console.error("❌ Database connection failed");
      return false;
    }

    console.log("✅ Database connected successfully");

    // 1. التحقق من وجود حقل username
    try {
      const [columns] = await db.execute(`
        SHOW COLUMNS FROM users LIKE 'username'
      `);
      
      if (Array.isArray(columns) && columns.length === 0) {
        // إضافة حقل username إذا لم يكن موجوداً
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
        // إضافة حقل password إذا لم يكن موجوداً
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

    console.log("✅ Database migration completed successfully!");
    return true;

  } catch (error) {
    console.error("❌ Database migration failed:", error);
    return false;
  }
}

// Migration is called automatically from server/_core/index.ts
// No need to run it when this file is imported directly
