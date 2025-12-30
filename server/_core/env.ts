export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  // Individual database config (fallback for production)
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: process.env.DB_PORT ?? "3306",
  dbUser: process.env.DB_USER ?? "u521934522_nasma_db_new",
  dbPassword: process.env.DB_PASSWORD ?? "uRo2hz3yf0|",
  dbName: process.env.DB_NAME ?? "u521934522_nasma_db",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  devBypassAuth: process.env.DEV_BYPASS_AUTH === "true",
};
