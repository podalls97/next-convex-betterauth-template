# Next.js + Convex + Better Auth Template

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat&logo=react)](https://react.dev/)
[![Convex](https://img.shields.io/badge/Convex-Realtime-orange?style=flat&logo=convex)](https://convex.dev/)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-Latest-green?style=flat)](https://better-auth.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **production-ready**, full-stack authentication template built with Next.js 16, Convex, and Better Auth. This template provides a complete authentication system with multiple auth methods, real-time database, comprehensive documentation, and API reference.

> **✨ New!** Built-in [Documentation](/documentation) and [API Reference](/api-reference) pages to help you get started quickly!

## 🚀 Features

### Authentication Methods
- ✅ **Email/Password** - Traditional authentication with secure password handling
- ✅ **OAuth Providers** - Google, GitHub, and Slack (via genericOAuth)
- ✅ **Magic Links** - Passwordless authentication via email
- ✅ **Email OTP** - One-time password verification
- ✅ **Two-Factor Authentication (2FA)** - TOTP-based 2FA with QR codes and backup codes
- ✅ **Anonymous Auth** - Guest access for users

### Core Features
- ✅ **Protected Routes** - Automatic route protection with Next.js 16 proxy pattern
- ✅ **Email Verification** - Verify user emails with secure tokens
- ✅ **Password Reset** - Secure password recovery flow
- ✅ **Modern UI** - Beautiful, responsive design with dark mode support
- ✅ **Type Safety** - Full TypeScript support with Convex
- ✅ **Real-time Database** - Powered by Convex for instant updates
- ✅ **Email Templates** - Pre-built React Email templates for all auth flows

### Developer Experience
- ✅ **Comprehensive Documentation** - Built-in `/documentation` page with setup guides
- ✅ **API Reference** - Full API documentation at `/api-reference` with code examples
- ✅ **Claude AI Ready** - Includes `CLAUDE.md` for AI coding assistants
- ✅ **TypeScript** - Full type safety throughout the stack
- ✅ **Tailwind CSS v4** - Modern styling with utility classes
- ✅ **Radix UI** - Accessible component primitives

## 📖 Quick Links

- 📚 **[Documentation](/documentation)** - Complete setup guide, architecture overview, and deployment instructions
- 🔧 **[API Reference](/api-reference)** - Comprehensive API documentation with copy-paste examples
- 🤖 **[CLAUDE.md](CLAUDE.md)** - Technical documentation for AI coding assistants
- 💬 **[GitHub Issues](https://github.com/podalls97/next-convex-betterauth-template/issues)** - Report bugs or request features
- ⭐ **[Star on GitHub](https://github.com/podalls97/next-convex-betterauth-template)** - Show your support!

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Convex CLI](https://docs.convex.dev/get-started/quickstart)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/podalls97/next-convex-betterauth-template.git
cd next-convex-betterauth-template
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Convex (automatic)
CONVEX_DEPLOYMENT=automatic
NEXT_PUBLIC_CONVEX_URL=https://example.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://example.convex.site

# Site Configuration
SITE_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Better Auth
BETTER_AUTH_SECRET=
```

### 4. Set Up Convex Variables

After creating your `.env.local` file, set the required variables in Convex:

```bash
# Set up environment variables in Convex (development)
pnpm convex env set SITE_URL http://localhost:3000
pnpm convex env set BETTER_AUTH_SECRET your-secret-key-here
pnpm convex env set GOOGLE_CLIENT_ID your-google-client-id
pnpm convex env set GOOGLE_CLIENT_SECRET your-google-client-secret
pnpm convex env set GITHUB_CLIENT_ID your-github-client-id
pnpm convex env set GITHUB_CLIENT_SECRET your-github-client-secret

# Set up environment variables in Convex (production)
pnpm convex env set SITE_URL your-production-domain --prod
pnpm convex env set BETTER_AUTH_SECRET your-secret-key-here --prod
pnpm convex env set GOOGLE_CLIENT_ID your-google-client-id --prod
pnpm convex env set GOOGLE_CLIENT_SECRET your-google-client-secret --prod
pnpm convex env set GITHUB_CLIENT_ID your-github-client-id --prod
pnpm convex env set GITHUB_CLIENT_SECRET your-github-client-secret --prod
```

### 6. Required API Keys

You'll need to set up the following services:

#### 📧 Email Service (Choose one)

**Option 1: Resend (Recommended)**
- Sign up at [Resend](https://resend.com/)
- Get your API key from the dashboard
- Add `RESEND_API_KEY` to your environment variables in Convex

**Option 2: SMTP (Gmail/Outlook)**
- For Gmail: Enable 2FA and create an App Password
- For Outlook: Use your regular credentials
- Add SMTP variables to your environment

#### 🔐 Better Auth Secret
- Generate a secure random string using: `openssl rand -base64 32`
- Add to `BETTER_AUTH_SECRET` in both `.env.local` and Convex

#### 🔑 OAuth Providers (Optional)

**Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure consent screen if prompted
6. Set application type to "Web application"
7. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
8. Copy `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

**GitHub OAuth**
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` (dev) or your production URL
   - Authorization callback URL:
     - Development: `http://localhost:3000/api/auth/callback/github`
     - Production: `https://yourdomain.com/api/auth/callback/github`
4. Copy `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

**Slack OAuth (via genericOAuth)**
1. Go to [Slack API](https://api.slack.com/apps)
2. Click "Create New App" > "From scratch"
3. Configure OAuth & Permissions
4. Add redirect URL: `http://localhost:3000/api/auth/callback/slack`
5. Copy `SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET`
6. Update `convex/auth.ts` and `src/lib/auth-client.ts` to include Slack configuration

### 5. Start Development

#### Option 1: Start Everything (Recommended)
```bash
# This will automatically start both Convex dev and Next.js dev
pnpm dev
```

#### Option 2: Start Convex Only
```bash
# Start Convex development server only
pnpm convex dev

# Or run once and exit
pnpm convex dev --once
```

**Note**: If you encounter errors after running `pnpm install` after cloning this repo, make sure you have added the required environment variables to your `.env.local` file, then run `pnpm convex env set` to set up the variables in Convex.

The `pnpm dev` command will:
- Start Convex development server
- Start Next.js development server  
- Open your browser to `http://localhost:3000`

## 🎯 Quick Start Guide

1. **Sign Up**: Create a new account at `/sign-up`
2. **Verify Email**: Check your email and click the verification link
3. **Sign In**: Use your credentials at `/sign-in`
4. **Dashboard**: Access your protected dashboard at `/dashboard`
5. **Settings**: Configure 2FA and other settings at `/settings`

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Protected routes (requires authentication)
│   │   ├── dashboard/       # Main user dashboard
│   │   ├── settings/        # User settings (2FA, profile)
│   │   ├── documentation/   # 📚 Built-in documentation page
│   │   └── api-reference/   # 🔧 Built-in API reference
│   ├── (unauth)/            # Public routes
│   │   ├── sign-in/         # Sign in page
│   │   ├── sign-up/         # Registration page
│   │   ├── verify-2fa/      # 2FA verification
│   │   └── reset-password/  # Password reset
│   └── api/auth/[...all]/   # Next.js API route (delegates to Convex)
├── components/
│   ├── client/              # Client components
│   └── server/              # Server components
├── lib/
│   ├── auth.ts              # Better Auth server configuration
│   └── auth-client.ts       # Better Auth client hooks
└── proxy.ts                 # Route protection (Next.js 16 proxy pattern)

convex/
├── auth.config.ts           # Better Auth domain configuration
├── auth.ts                  # Better Auth + Convex integration
├── schema.ts                # Convex database schema
├── http.ts                  # HTTP routes for Better Auth
├── email.tsx                # Email templates (React Email)
└── polyfills.ts             # Required for Better Auth in Convex
```

## 🔧 Adding New Pages

To add new pages to your dashboard:

1. Create a new directory in `src/app/(auth)/dashboard/`
2. Add a `page.tsx` file
3. Use the provided components:

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { AppContainer } from "@/components/server";

export default function MyPage() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <AppContainer>
      <h1>Hello {user?.name}!</h1>
      {/* Your page content */}
    </AppContainer>
  );
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure build settings:
   - **Build Command**: `npx convex deploy --cmd 'pnpm run build'`
   - **Install Command**: `pnpm install`
4. Add environment variables in Vercel dashboard:
   - All variables from your `.env.local` file
   - **Additional variables for production**:
     - `CONVEX_SITE_URL=your-domain` (your production domain)
     - `CONVEX_DEPLOYMENT=key from convex dashboard` (available in Convex dashboard under Settings > Deployment URL and Deploy Key)
5. Deploy!

### Deploy Convex

```bash
pnpm convex deploy
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Resend Documentation](https://resend.com/docs)

## 🤖 For AI Agents & Developers

If you're working with AI coding assistants or need to modify authentication providers:

### Adding/Removing Auth Providers
When adding or removing authentication providers (Google, GitHub, etc.):

1. **Update Environment Variables**: Add or remove the corresponding `CLIENT_ID` and `CLIENT_SECRET` variables in both `.env.local` and Convex
2. **Check Convex Configuration**: Review and update `convex/auth.config.ts` to include/exclude the provider
3. **Update Mutations**: Ensure all related Convex mutations and functions are updated to handle the new/removed provider
4. **Test Authentication Flow**: Verify the complete authentication flow works with the changes

### Quick Provider Management
- **To add a provider**: Configure the provider in `convex/auth.config.ts`, add environment variables, and update any related mutations
- **To remove a provider**: Remove from auth config, clean up environment variables, and update mutations to handle the removal

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/podalls97/next-convex-betterauth-template/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy coding! :D**
