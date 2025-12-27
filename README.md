# Nesma Barzan Trading - نسمة برزان التجارية

![Nesma Barzan Logo](client/public/logo.png)

A professional bilingual (Arabic/English) corporate website for Nesma Barzan Trading Company, featuring a comprehensive admin panel for content management.

## Overview

Nesma Barzan Trading is a Saudi association specialized in business development, creations and copyrights, established in 2005 in Riyadh. This website showcases the company's profile and its flagship project **SHHEER** - an innovative mobile advertising platform.

## Features

### Public Website
- **Bilingual Support**: Full Arabic and English language support with RTL/LTR layouts
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Company Profile**: About section with company history, vision, and mission
- **SHHEER Project**: Detailed presentation of the innovative advertising platform
- **Projects Showcase**: Dynamic banner displaying company projects
- **Contact Information**: Complete contact details and location

### Admin Panel
- **Protected Access**: Admin-only access with role-based authentication
- **Content Management**: Edit all website texts in both languages
- **Projects Management**: Full CRUD operations for company projects
- **Image Management**: Upload, preview, and delete images via S3 storage
- **Real-time Updates**: Changes reflect immediately on the public site

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express.js, tRPC
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: Manus OAuth
- **Storage**: S3-compatible object storage
- **Styling**: shadcn/ui components

## Project Structure

```
nesma-barzan/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Language, Theme)
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin panel pages
│   │   └── lib/            # Utilities and translations
│   └── public/             # Static assets
├── server/                 # Backend Express/tRPC server
│   ├── routers.ts          # API routes
│   ├── db.ts               # Database queries
│   └── storage.ts          # S3 storage helpers
├── drizzle/                # Database schema and migrations
└── shared/                 # Shared types and constants
```

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm package manager
- MySQL/TiDB database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nesma-barzan.git
cd nesma-barzan
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (see `.env.example`)

4. Run database migrations:
```bash
pnpm db:push
```

5. Start development server:
```bash
pnpm dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL/TiDB connection string |
| `JWT_SECRET` | Secret for JWT token signing |
| `VITE_APP_ID` | Manus OAuth application ID |
| `OAUTH_SERVER_URL` | Manus OAuth server URL |
| `BUILT_IN_FORGE_API_URL` | Storage API URL |
| `BUILT_IN_FORGE_API_KEY` | Storage API key |

## API Endpoints

### Public Endpoints
- `GET /api/trpc/content.getAll` - Get all site content
- `GET /api/trpc/projects.getActive` - Get active projects
- `GET /api/trpc/images.getAll` - Get all images

### Admin Endpoints (Protected)
- `POST /api/trpc/content.upsert` - Create/update content
- `POST /api/trpc/projects.create` - Create project
- `POST /api/trpc/projects.update` - Update project
- `POST /api/trpc/projects.delete` - Delete project
- `POST /api/trpc/images.upload` - Upload image
- `POST /api/trpc/images.delete` - Delete image

## Testing

Run the test suite:
```bash
pnpm test
```

## Contact

- **Phone**: +966 555 499 991
- **Email**: info@shheer.com
- **Website**: www.shheer.com
- **Location**: Riyadh, Saudi Arabia

## License

© 2024 Nesma Barzan Trading. All Rights Reserved.

Owner: Mr. Ali Ibrahim Al-Dlaigan
