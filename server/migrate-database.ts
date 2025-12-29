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

    // 1. إضافة حقل username
    try {
      await db.execute(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS username VARCHAR(100) UNIQUE
      `);
      console.log("✅ Added 'username' column");
    } catch (error: any) {
      if (error.message && error.message.includes("Duplicate column")) {
        console.log("ℹ️  Column 'username' already exists");
      } else {
        console.error("⚠️  Error adding 'username' column:", error.message);
      }
    }

    // 2. إضافة حقل password
    try {
      await db.execute(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS password VARCHAR(255)
      `);
      console.log("✅ Added 'password' column");
    } catch (error: any) {
      if (error.message && error.message.includes("Duplicate column")) {
        console.log("ℹ️  Column 'password' already exists");
      } else {
        console.error("⚠️  Error adding 'password' column:", error.message);
      }
    }

    // 3. جعل openId nullable
    try {
      await db.execute(`
        ALTER TABLE users 
        MODIFY COLUMN openId VARCHAR(64) UNIQUE NULL
      `);
      console.log("✅ Modified 'openId' column to be nullable");
    } catch (error: any) {
      console.error("⚠️  Error modifying 'openId' column:", error.message);
    }

    console.log("✅ Database migration completed successfully!");
    return true;

  } catch (error) {
    console.error("❌ Database migration failed:", error);
    return false;
  }
}

// تشغيل Migration عند استيراد الملف مباشرة
if (require.main === module) {
  migrateDatabase()
    .then((success) => {
      if (success) {
        console.log("🎉 Migration finished!");
        process.exit(0);
      } else {
        console.error("💥 Migration failed!");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("💥 Unexpected error:", error);
      process.exit(1);
    });
}
