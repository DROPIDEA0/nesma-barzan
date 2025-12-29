import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

// Admin procedure - only allows admin users
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
