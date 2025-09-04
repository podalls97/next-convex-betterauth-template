# Project Structure

## Root Level
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `./src/*`)
- `next.config.ts` - Next.js configuration
- `.env.local` - Environment variables (not committed)
- `.prettierrc` - Prettier configuration (empty object for defaults)

## Source Code (`src/`)

### App Router (`src/app/`)
Uses Next.js App Router with route groups for organization:

- `layout.tsx` - Root layout with providers (Theme, Convex, Auth)
- `page.tsx` - Landing page
- `globals.css` - Global styles and Tailwind imports

#### Authentication Routes (`(unauth)/`)
- `sign-in/` - Login page and components
- `sign-up/` - Registration page and components  
- `verify-2fa/` - Two-factor authentication verification

#### Protected Routes (`(auth)/`)
- `dashboard/client-only/` - Client-side rendered todo demo
- `dashboard/server/` - Server-side rendered todo demo with actions
- `settings/` - User settings including 2FA setup

#### API Routes (`api/`)
- `auth/[...all]/route.ts` - Better Auth API handler

### Components (`src/components/`)
- `ui/` - Reusable UI components (Radix-based)
- `Navigator/` - Navigation components
- `next-theme/` - Theme provider wrapper
- `client.tsx` & `server.tsx` - Demo components

### Library (`src/lib/`)
- `auth.ts` - Better Auth configuration and setup
- `auth-client.ts` - Client-side auth utilities
- `utils.ts` - Utility functions (likely class merging)

### Middleware (`src/middleware.ts`)
Route protection and authentication checks

## Backend (`convex/`)

### Core Files
- `convex.config.ts` - Convex app configuration with plugins
- `schema.ts` - Database schema definitions (users, todos)
- `auth.ts` - Server-side auth integration
- `http.ts` - HTTP endpoints

### Generated Files (`_generated/`)
Auto-generated TypeScript definitions and API clients

### Email System (`emails/`)
- `components/BaseEmail.tsx` - Base email template
- Individual email templates (magic link, reset password, etc.)

## Conventions

### Route Organization
- Use route groups `(auth)` and `(unauth)` for logical separation
- Co-locate page components with their routes
- Separate client and server rendering patterns in different folders

### Component Structure
- UI components in `src/components/ui/` follow Radix patterns
- Business logic components alongside their routes
- Shared components in `src/components/`

### Import Patterns
- Use `@/` alias for src imports
- Convex imports use relative paths from convex root
- Generated Convex types imported from `convex/_generated/`

### File Naming
- Pages: `page.tsx`
- Layouts: `layout.tsx` 
- Components: PascalCase (e.g., `SignIn.tsx`)
- Utilities: camelCase (e.g., `auth-client.ts`)