import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import { authenticateUser, hashPassword } from "./auth";
import { logger } from "./logger";
import { setupAdmin } from "./setup-admin";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Admin procedure - only allows admin users
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  // Debug endpoint to view logs
  viewLogs: publicProcedure
    .input(z.object({
      limit: z.number().optional(),
      category: z.string().optional()
    }).optional())
    .query(async ({ input }) => {
      const logs = logger.getLogs(input?.limit, input?.category);
      return {
        success: true,
        count: logs.length,
        logs
      };
    }),
  
  // Debug endpoint to test database connection
  testDb: publicProcedure.query(async () => {
    // Import ENV for debugging
    const { ENV } = await import('./_core/env');
    
    const dbConfig = {
      DB_HOST: process.env.DB_HOST || ENV.DB_HOST,
      DB_PORT: process.env.DB_PORT || ENV.DB_PORT,
      DB_USER: process.env.DB_USER || ENV.DB_USER,
      DB_NAME: process.env.DB_NAME || ENV.DB_NAME,
      hasPassword: !!(process.env.DB_PASSWORD || ENV.DB_PASSWORD),
    };
    
    try {
      const database = await db.getDb();
      if (!database) {
        return { success: false, error: 'Database is null', env: process.env.NODE_ENV, dbConfig };
      }
      
      const allUsers = await database.select({ id: users.id, username: users.username, role: users.role }).from(users);
      return { 
        success: true, 
        env: process.env.NODE_ENV,
        dbType: 'connected',
        usersCount: allUsers.length,
        users: allUsers,
        dbConfig
      };
    } catch (error: any) {
      return { success: false, error: error.message, stack: error.stack, env: process.env.NODE_ENV, dbConfig };
    }
  }),
  
  // Manual setup endpoint
  setup: publicProcedure
    .input(z.object({
      secretKey: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await setupAdmin(input.secretKey);
    }),
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    login: publicProcedure
      .input(z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        console.log('[Login] Attempting login for username:', input.username);
        
        // Database authentication only
        console.log('[Login] Authenticating against database...');
        const user = await authenticateUser(input.username, input.password);
        
        if (!user) {
          console.log('[Login] Authentication failed');
          throw new TRPCError({ 
            code: 'UNAUTHORIZED', 
            message: 'اسم المستخدم أو كلمة المرور غير صحيحة' 
          });
        }

        console.log('[Login] Database authentication successful');
        // Update last signed in
        try {
          await db.updateUser(user.id, { lastSignedIn: new Date() });
        } catch (error) {
          console.error('[Login] Failed to update last signed in:', error);
        }

        // Create JWT session token
        const sessionToken = await sdk.signSession({
          openId: user.openId || `user-${user.id}`,
          appId: 'nesma-barzan',
          name: user.name || user.username || '',
        }, { expiresInMs: ONE_YEAR_MS });
        
        // Set session cookie with JWT token
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);
        
        return { success: true, user };
      }),
    
    changePassword: protectedProcedure
      .input(z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(6),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        // Get user with password
        const userWithPassword = await db.getUserById(ctx.user.id);
        if (!userWithPassword || !userWithPassword.password) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'المستخدم غير موجود' });
        }

        // Verify current password
        const bcrypt = await import('bcryptjs');
        const isValid = await bcrypt.compare(input.currentPassword, userWithPassword.password);
        if (!isValid) {
          throw new TRPCError({ 
            code: 'UNAUTHORIZED', 
            message: 'كلمة المرور الحالية غير صحيحة' 
          });
        }

        // Hash new password
        const hashedPassword = await hashPassword(input.newPassword);
        
        // Update password
        await db.updateUser(ctx.user.id, { password: hashedPassword });
        
        return { success: true };
      }),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Site Content Management
  content: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllSiteContent();
    }),
    
    getBySection: publicProcedure
      .input(z.object({ section: z.string() }))
      .query(async ({ input }) => {
        return db.getSiteContentBySection(input.section);
      }),
    
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return db.getSiteContentByKey(input.key);
      }),
    
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        titleAr: z.string().optional(),
        titleEn: z.string().optional(),
        contentAr: z.string().optional(),
        contentEn: z.string().optional(),
        section: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.upsertSiteContent(input);
        return { success: true };
      }),
  }),

  // Projects Management
  projects: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllProjects();
    }),
    
    getActive: publicProcedure.query(async () => {
      return db.getActiveProjects();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getProjectById(input.id);
      }),
    
    create: adminProcedure
      .input(z.object({
        titleAr: z.string(),
        titleEn: z.string(),
        descriptionAr: z.string().optional(),
        descriptionEn: z.string().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        isActive: z.boolean().default(true),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createProject(input);
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        titleAr: z.string().optional(),
        titleEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        descriptionEn: z.string().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProject(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProject(input.id);
        return { success: true };
      }),
  }),

  // Site Settings Management
  settings: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllSettings();
    }),
    
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return db.getSettingsByCategory(input.category);
      }),
    
    getByKey: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return db.getSettingByKey(input.key);
      }),
    
    upsert: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string().optional(),
        type: z.enum(["text", "number", "image", "json", "boolean"]),
        category: z.string(),
        labelAr: z.string().optional(),
        labelEn: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.upsertSetting(input);
        return { success: true };
      }),
  }),

  // Navigation Items Management
  navigation: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllNavigationItems();
    }),
    
    getActive: publicProcedure.query(async () => {
      return db.getActiveNavigationItems();
    }),
    
    create: adminProcedure
      .input(z.object({
        labelAr: z.string(),
        labelEn: z.string(),
        url: z.string(),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
        parentId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createNavigationItem(input);
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        labelAr: z.string().optional(),
        labelEn: z.string().optional(),
        url: z.string().optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
        parentId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateNavigationItem(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNavigationItem(input.id);
        return { success: true };
      }),
  }),

  // Hero Statistics Management
  heroStats: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllHeroStats();
    }),
    
    getActive: publicProcedure.query(async () => {
      return db.getActiveHeroStats();
    }),
    
    create: adminProcedure
      .input(z.object({
        labelAr: z.string(),
        labelEn: z.string(),
        value: z.string(),
        suffix: z.string().optional(),
        icon: z.string().optional(),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createHeroStat(input);
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        labelAr: z.string().optional(),
        labelEn: z.string().optional(),
        value: z.string().optional(),
        suffix: z.string().optional(),
        icon: z.string().optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateHeroStat(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteHeroStat(input.id);
        return { success: true };
      }),
  }),

  // Features Management
  features: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllFeatures();
    }),
    
    getByCategory: publicProcedure
      .input(z.object({ category: z.enum(["mechanism", "advantage", "revenue"]) }))
      .query(async ({ input }) => {
        return db.getFeaturesByCategory(input.category);
      }),
    
    create: adminProcedure
      .input(z.object({
        titleAr: z.string(),
        titleEn: z.string(),
        descriptionAr: z.string().optional(),
        descriptionEn: z.string().optional(),
        value: z.string().optional(),
        icon: z.string().optional(),
        category: z.enum(["mechanism", "advantage", "revenue"]),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createFeature(input);
        return { id };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        titleAr: z.string().optional(),
        titleEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        descriptionEn: z.string().optional(),
        value: z.string().optional(),
        icon: z.string().optional(),
        category: z.enum(["mechanism", "advantage", "revenue"]).optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateFeature(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteFeature(input.id);
        return { success: true };
      }),
  }),

  // Images Management
  images: router({
    getAll: publicProcedure.query(async () => {
      return db.getAllImages();
    }),
    
    upload: publicProcedure
      .input(z.object({
        filename: z.string(),
        base64Data: z.string(),
        mimeType: z.string(),
        altTextAr: z.string().optional(),
        altTextEn: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64Data, 'base64');
        const filename = `${nanoid()}-${input.filename}`;
        const fileKey = `images/${filename}`;
        
        // Save file locally to public/uploads
        const fs = await import('fs/promises');
        const path = await import('path');
        const uploadsDir = path.join(process.cwd(), 'client', 'public', 'uploads');
        
        // Create uploads directory if it doesn't exist
        try {
          await fs.mkdir(uploadsDir, { recursive: true });
        } catch (err) {
          // Directory already exists
        }
        
        const filePath = path.join(uploadsDir, filename);
        await fs.writeFile(filePath, buffer);
        
        const url = `/uploads/${filename}`;
        
        const id = await db.createImage({
          filename: input.filename,
          url,
          fileKey,
          mimeType: input.mimeType,
          size: buffer.length,
          altTextAr: input.altTextAr,
          altTextEn: input.altTextEn,
        });
        
        return { id, url, fileKey };
      }),
    
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const image = await db.deleteImage(input.id);
        // Note: S3 file cleanup can be handled separately if needed
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
