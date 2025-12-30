import { InsertUser, users, siteContent, InsertSiteContent, projects, InsertProject, images, InsertImage } from "../drizzle/schema";
import { ENV } from './_core/env';
import { eq, asc, desc } from 'drizzle-orm';

// Import MySQL or SQLite based on environment
let db: any;

// Check if we should use MySQL (production) or SQLite (development)
const useMySQL = process.env.NODE_ENV === 'production' || 
                 process.env.DB_USER || 
                 process.env.DATABASE_URL?.includes('mysql');

if (useMySQL) {
  // Use MySQL in production
  console.log('[Database] Initializing MySQL for production');
  const { initializeMySQL } = require('./db-mysql');
  initializeMySQL().then((mysqlDb: any) => {
    db = mysqlDb;
    console.log('[Database] MySQL connected');
  }).catch((error: any) => {
    console.error('[Database] MySQL initialization failed:', error);
    // Fallback to SQLite if MySQL fails
    console.log('[Database] Falling back to SQLite');
    const { db: sqliteDb } = require('./db-sqlite');
    db = sqliteDb;
  });
} else {
  // Use SQLite for development
  console.log('[Database] Using SQLite for development');
  const { db: sqliteDb } = require('./db-sqlite');
  db = sqliteDb;
}

export async function getDb() {
  return db;
}

// ============ USER FUNCTIONS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values)
      .onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateUser(id: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user: database not available");
    return;
  }

  await db.update(users).set(data).where(eq(users.id, id));
}

// ============ SITE CONTENT FUNCTIONS ============

export async function getAllSiteContent() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent);
}

export async function getSiteContentBySection(section: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent).where(eq(siteContent.section, section));
}

export async function getSiteContentByKey(key: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
  return result[0] || null;
}

export async function upsertSiteContent(data: InsertSiteContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(siteContent).values(data)
    .onConflictDoUpdate({
      target: siteContent.key,
      set: {
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        section: data.section,
      },
    });
}

// ============ PROJECTS FUNCTIONS ============

export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getActiveProjects() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(eq(projects.isActive, true)).orderBy(asc(projects.sortOrder));
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0] || null;
}

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(data);
  return result[0].insertId;
}

export async function updateProject(id: number, data: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(projects).where(eq(projects.id, id));
}

// ============ IMAGES FUNCTIONS ============

export async function getAllImages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(images).orderBy(desc(images.createdAt));
}

export async function createImage(data: InsertImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(images).values(data);
  return result[0].insertId;
}

export async function deleteImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const image = await db.select().from(images).where(eq(images.id, id)).limit(1);
  await db.delete(images).where(eq(images.id, id));
  return image[0] || null;
}

// ============ SITE SETTINGS FUNCTIONS ============

export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    return await db.select().from(siteSettings);
  } catch (error) {
    console.error("[Database] Error getting settings:", error);
    return [];
  }
}

export async function getSettingsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(siteSettings).where(eq(siteSettings.category, category));
  } catch (error) {
    console.error("[Database] Error getting settings by category:", error);
    return [];
  }
}

export async function getSettingByKey(key: string) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const results = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return results[0] || null;
  } catch (error) {
    console.error("[Database] Error getting setting by key:", error);
    return null;
  }
}

export async function upsertSetting(setting: any) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    // Don't include timestamps, let SQLite handle them with DEFAULT values
    const { createdAt, updatedAt, ...cleanSetting } = setting;
    await db.insert(siteSettings).values(cleanSetting as any)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: cleanSetting as any,
      });
  } catch (error) {
    console.error("[Database] Error upserting setting:", error);
    throw error;
  }
}

// ============ NAVIGATION ITEMS FUNCTIONS ============

export async function getAllNavigationItems() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { navigationItems } = await import("../drizzle/schema");
    const { asc } = await import("drizzle-orm");
    return await db.select().from(navigationItems).orderBy(asc(navigationItems.sortOrder));
  } catch (error) {
    console.error("[Database] Error getting navigation items:", error);
    return [];
  }
}

export async function getActiveNavigationItems() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { navigationItems } = await import("../drizzle/schema");
    const { eq, asc } = await import("drizzle-orm");
    return await db.select().from(navigationItems)
      .where(eq(navigationItems.isActive, true))
      .orderBy(asc(navigationItems.sortOrder));
  } catch (error) {
    console.error("[Database] Error getting active navigation items:", error);
    return [];
  }
}

export async function createNavigationItem(item: any) {
  const db = await getDb();
  if (!db) return 0;
  
  try {
    const { navigationItems } = await import("../drizzle/schema");
    const result = await db.insert(navigationItems).values(item);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Error creating navigation item:", error);
    throw error;
  }
}

export async function updateNavigationItem(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { navigationItems } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    await db.update(navigationItems).set(data).where(eq(navigationItems.id, id));
  } catch (error) {
    console.error("[Database] Error updating navigation item:", error);
    throw error;
  }
}

export async function deleteNavigationItem(id: number) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { navigationItems } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    await db.delete(navigationItems).where(eq(navigationItems.id, id));
  } catch (error) {
    console.error("[Database] Error deleting navigation item:", error);
    throw error;
  }
}

// ============ HERO STATS FUNCTIONS ============

export async function getAllHeroStats() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { heroStats } = await import("../drizzle/schema");
    const { asc } = await import("drizzle-orm");
    return await db.select().from(heroStats).orderBy(asc(heroStats.sortOrder));
  } catch (error) {
    console.error("[Database] Error getting hero stats:", error);
    return [];
  }
}

export async function getActiveHeroStats() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { heroStats } = await import("../drizzle/schema");
    const { eq, asc } = await import("drizzle-orm");
    return await db.select().from(heroStats)
      .where(eq(heroStats.isActive, true))
      .orderBy(asc(heroStats.sortOrder));
  } catch (error) {
    console.error("[Database] Error getting active hero stats:", error);
    return [];
  }
}

export async function createHeroStat(stat: any) {
  const db = await getDb();
  if (!db) return 0;
  
  try {
    const { heroStats } = await import("../drizzle/schema");
    const result = await db.insert(heroStats).values(stat);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Error creating hero stat:", error);
    throw error;
  }
}

export async function updateHeroStat(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { heroStats } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    await db.update(heroStats).set(data).where(eq(heroStats.id, id));
  } catch (error) {
    console.error("[Database] Error updating hero stat:", error);
    throw error;
  }
}

export async function deleteHeroStat(id: number) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { heroStats } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    await db.delete(heroStats).where(eq(heroStats.id, id));
  } catch (error) {
    console.error("[Database] Error deleting hero stat:", error);
    throw error;
  }
}

// ============ FEATURES FUNCTIONS ============

export async function getAllFeatures() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { features } = await import("../drizzle/schema");
    const { asc } = await import("drizzle-orm");
    return await db.select().from(features).orderBy(asc(features.sortOrder));
  } catch (error) {
    console.error("[Database] Error getting features:", error);
    return [];
  }
}

export async function getFeaturesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { features } = await import("../drizzle/schema");
    const { eq, asc } = await import("drizzle-orm");
    return await db.select().from(features)
      .where(eq(features.category, category))
      .orderBy(asc(features.sortOrder));
  } catch (error) {
    console.error("[Database] Error getting features by category:", error);
    return [];
  }
}

export async function createFeature(feature: any) {
  const db = await getDb();
  if (!db) return 0;
  
  try {
    const { features } = await import("../drizzle/schema");
    const result = await db.insert(features).values(feature);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Error creating feature:", error);
    throw error;
  }
}

export async function updateFeature(id: number, data: any) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { features } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    await db.update(features).set(data).where(eq(features.id, id));
  } catch (error) {
    console.error("[Database] Error updating feature:", error);
    throw error;
  }
}

export async function deleteFeature(id: number) {
  const db = await getDb();
  if (!db) return;
  
  try {
    const { features } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    await db.delete(features).where(eq(features.id, id));
  } catch (error) {
    console.error("[Database] Error deleting feature:", error);
    throw error;
  }
}
