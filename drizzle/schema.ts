import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Site content table for multilingual content management
 */
export const siteContent = mysqlTable("site_content", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  titleAr: text("titleAr"),
  titleEn: text("titleEn"),
  contentAr: text("contentAr"),
  contentEn: text("contentEn"),
  section: varchar("section", { length: 50 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = typeof siteContent.$inferInsert;

/**
 * Projects table for company projects/portfolio
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  imageUrl: text("imageUrl"),
  imageKey: varchar("imageKey", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Images table for media management
 */
export const images = mysqlTable("images", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  url: text("url").notNull(),
  fileKey: varchar("fileKey", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  size: int("size"),
  altTextAr: varchar("altTextAr", { length: 255 }),
  altTextEn: varchar("altTextEn", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Image = typeof images.$inferSelect;
export type InsertImage = typeof images.$inferInsert;
