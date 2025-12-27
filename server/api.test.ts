import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock database functions
vi.mock("./db", () => ({
  getAllSiteContent: vi.fn().mockResolvedValue([
    { id: 1, key: "test_key", titleAr: "عنوان", titleEn: "Title", contentAr: "محتوى", contentEn: "Content", section: "general" }
  ]),
  getSiteContentBySection: vi.fn().mockResolvedValue([
    { id: 1, key: "test_key", titleAr: "عنوان", titleEn: "Title", contentAr: "محتوى", contentEn: "Content", section: "about" }
  ]),
  getSiteContentByKey: vi.fn().mockResolvedValue(
    { id: 1, key: "test_key", titleAr: "عنوان", titleEn: "Title", contentAr: "محتوى", contentEn: "Content", section: "general" }
  ),
  upsertSiteContent: vi.fn().mockResolvedValue(undefined),
  getAllProjects: vi.fn().mockResolvedValue([
    { id: 1, titleAr: "مشروع", titleEn: "Project", descriptionAr: "وصف", descriptionEn: "Description", isActive: true, sortOrder: 0 }
  ]),
  getActiveProjects: vi.fn().mockResolvedValue([
    { id: 1, titleAr: "مشروع", titleEn: "Project", descriptionAr: "وصف", descriptionEn: "Description", isActive: true, sortOrder: 0 }
  ]),
  getProjectById: vi.fn().mockResolvedValue(
    { id: 1, titleAr: "مشروع", titleEn: "Project", descriptionAr: "وصف", descriptionEn: "Description", isActive: true, sortOrder: 0 }
  ),
  createProject: vi.fn().mockResolvedValue(1),
  updateProject: vi.fn().mockResolvedValue(undefined),
  deleteProject: vi.fn().mockResolvedValue(undefined),
  getAllImages: vi.fn().mockResolvedValue([
    { id: 1, filename: "test.png", url: "https://example.com/test.png", fileKey: "images/test.png", mimeType: "image/png", size: 1024 }
  ]),
  createImage: vi.fn().mockResolvedValue(1),
  deleteImage: vi.fn().mockResolvedValue({ id: 1, fileKey: "images/test.png" }),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "images/test.png", url: "https://example.com/test.png" }),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("Content API", () => {
  it("allows public access to getAll content", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.content.getAll();
    
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe("test_key");
  });

  it("allows public access to getBySection", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.content.getBySection({ section: "about" });
    
    expect(result).toHaveLength(1);
    expect(result[0].section).toBe("about");
  });

  it("allows public access to getByKey", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.content.getByKey({ key: "test_key" });
    
    expect(result).not.toBeNull();
    expect(result?.key).toBe("test_key");
  });

  it("allows admin to upsert content", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.content.upsert({
      key: "new_key",
      titleAr: "عنوان جديد",
      titleEn: "New Title",
      contentAr: "محتوى جديد",
      contentEn: "New Content",
      section: "general",
    });
    
    expect(result.success).toBe(true);
  });

  it("denies non-admin users from upserting content", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.content.upsert({
      key: "new_key",
      titleAr: "عنوان",
      titleEn: "Title",
      section: "general",
    })).rejects.toThrow();
  });
});

describe("Projects API", () => {
  it("allows public access to getAll projects", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.projects.getAll();
    
    expect(result).toHaveLength(1);
    expect(result[0].titleEn).toBe("Project");
  });

  it("allows public access to getActive projects", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.projects.getActive();
    
    expect(result).toHaveLength(1);
    expect(result[0].isActive).toBe(true);
  });

  it("allows admin to create project", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.projects.create({
      titleAr: "مشروع جديد",
      titleEn: "New Project",
      descriptionAr: "وصف المشروع",
      descriptionEn: "Project Description",
      isActive: true,
      sortOrder: 1,
    });
    
    expect(result.id).toBe(1);
  });

  it("allows admin to update project", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.projects.update({
      id: 1,
      titleAr: "مشروع محدث",
      titleEn: "Updated Project",
    });
    
    expect(result.success).toBe(true);
  });

  it("allows admin to delete project", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.projects.delete({ id: 1 });
    
    expect(result.success).toBe(true);
  });

  it("denies non-admin users from creating projects", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.projects.create({
      titleAr: "مشروع",
      titleEn: "Project",
    })).rejects.toThrow();
  });
});

describe("Images API", () => {
  it("allows public access to getAll images", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.images.getAll();
    
    expect(result).toHaveLength(1);
    expect(result[0].filename).toBe("test.png");
  });

  it("allows admin to upload image", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.images.upload({
      filename: "new-image.png",
      base64Data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      mimeType: "image/png",
      altTextAr: "صورة اختبار",
      altTextEn: "Test image",
    });
    
    expect(result.id).toBe(1);
    expect(result.url).toBe("https://example.com/test.png");
  });

  it("allows admin to delete image", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    
    const result = await caller.images.delete({ id: 1 });
    
    expect(result.success).toBe(true);
  });

  it("denies non-admin users from uploading images", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    
    await expect(caller.images.upload({
      filename: "test.png",
      base64Data: "test",
      mimeType: "image/png",
    })).rejects.toThrow();
  });
});
