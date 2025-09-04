# Technology Stack

## Core Framework
- **Next.js 15.5.2**: React framework with App Router, using Turbo for development and build optimization
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Strict type checking enabled

## Backend & Database
- **Convex**: Backend-as-a-service providing real-time database, serverless functions, and file storage
- **Convex Helpers**: Utility library for enhanced Convex functionality
- **Better Auth**: Modern authentication library with Convex adapter

## UI & Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library
- **next-themes**: Theme management (dark/light mode)
- **Sonner**: Toast notifications

## Form Handling & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

## Email & Communication
- **Resend**: Email delivery service
- **React Email**: Email template components

## Development Tools
- **ESLint 9**: Code linting with Next.js config
- **Prettier**: Code formatting (minimal config)
- **npm-run-all**: Parallel script execution

## Common Commands

### Development
```bash
pnpm run dev          # Start both frontend and backend in parallel
pnpm run dev:frontend # Start Next.js dev server with Turbo
pnpm run dev:backend  # Start Convex development server
```

### Build & Deploy
```bash
pnpm run build        # Build Next.js app with Turbopack
pnpm start           # Start production server
```

### Code Quality
```bash
pnpm run lint        # Run ESLint
```

## Environment Setup
- Requires `.env.local` for environment variables
- Convex deployment requires `convex dev` or `convex deploy`
- Email functionality requires Resend API key