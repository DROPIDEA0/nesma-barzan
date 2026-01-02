import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { seedInitialData } from "../seed-data";
import { createDefaultAdmin } from "../auth";
import { migrateDatabase } from "../migrate-database";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  console.log('[Server] Starting server initialization...');
  
  // Wait for database to be ready
  console.log('[Server] Waiting for database connection...');
  const { getDb } = await import('../db');
  const database = await getDb();
  
  if (!database) {
    console.warn('[Server] MySQL connection failed, will use SQLite as fallback');
  } else {
    console.log('[Server] MySQL database connected successfully');
  }
  
  console.log('[Server] Database connected successfully');
  
  // Run database migration first
  await migrateDatabase();
  
  // Seed initial data
  await seedInitialData();
  
  // Create default admin user if not exists
  await createDefaultAdmin();
  
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Setup endpoint for database initialization
  app.post("/api/setup-database", async (req, res) => {
    try {
      const { setupAdmin } = await import("../setup-admin");
      const result = await setupAdmin(req.body.secretKey);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Setup failed"
      });
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // In production, use port 3000 directly (Nginx is configured for it)
  // In development, find an available port to avoid conflicts
  const port = process.env.NODE_ENV === "production"
    ? 3000
    : await findAvailablePort(parseInt(process.env.PORT || "3000"));

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer().catch(console.error);
