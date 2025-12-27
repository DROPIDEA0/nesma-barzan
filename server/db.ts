import { eq, asc, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, siteContent, InsertSiteContent, projects, InsertProject, images, InsertImage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
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

    await db.insert(users).values(values).onDuplicateKeyUpdate({
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
  
  await db.insert(siteContent).values(data).onDuplicateKeyUpdate({
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
