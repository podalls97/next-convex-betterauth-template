# Next.js + Convex + Better Auth Template

A modern, full-stack authentication template built with Next.js, Convex, and Better Auth. This template provides a complete authentication system with email verification, password reset, and 2FA support.

## 🚀 Features

- ✅ **Complete Authentication System** - Sign up, sign in, email verification, password reset
- ✅ **Two-Factor Authentication (2FA)** - TOTP-based 2FA support
- ✅ **Protected Routes** - Automatic route protection with middleware
- ✅ **Modern UI** - Beautiful, responsive design with dark mode support
- ✅ **Type Safety** - Full TypeScript support with Convex
- ✅ **Real-time Database** - Powered by Convex for real-time updates
- ✅ **Email Templates** - Pre-built email templates for auth flows

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Convex CLI](https://docs.convex.dev/get-started/quickstart)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd next-convex-betterauth-template
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Convex

```bash
# Initialize Convex (if not already done)
pnpm convex dev

# Set up environment variables
pnpm convex env set CONVEX_DEPLOY_KEY your-deploy-key
pnpm convex env set CONVEX_DEPLOYMENT your-deployment-name
```

### 4. Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Convex
CONVEX_DEPLOYMENT=your-convex-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Email Configuration (Choose one)
# Option 1: Resend (Recommended)
RESEND_API_KEY=your-resend-api-key

# Option 2: SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 5. Required API Keys

You'll need to set up the following services:

#### 📧 Email Service (Choose one)

**Option 1: Resend (Recommended)**
- Sign up at [Resend](https://resend.com/)
- Get your API key from the dashboard
- Add `RESEND_API_KEY` to your environment variables

**Option 2: SMTP (Gmail/Outlook)**
- For Gmail: Enable 2FA and create an App Password
- For Outlook: Use your regular credentials
- Add SMTP variables to your environment

#### 🔐 Better Auth Secret
- Generate a secure random string (32+ characters)
- You can use: `openssl rand -base64 32`
- Add to `BETTER_AUTH_SECRET`

### 6. Start Development

```bash
# This will automatically start both Convex dev and Next.js dev
pnpm dev
```

The command will:
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
│   ├── (auth)/          # Protected routes
│   │   ├── dashboard/   # Main dashboard
│   │   └── settings/    # User settings
│   ├── (unauth)/        # Public routes
│   │   ├── sign-in/     # Sign in page
│   │   ├── sign-up/     # Sign up page
│   │   └── verify-2fa/  # 2FA verification
│   └── api/auth/        # Auth API routes
├── components/          # Reusable components
├── lib/                 # Utility functions
└── middleware.ts        # Route protection

convex/
├── auth.config.ts       # Better Auth configuration
├── auth.ts             # Auth functions
├── schema.ts           # Database schema
└── emails/             # Email templates
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
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy Convex

```bash
pnpm convex deploy
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Resend Documentation](https://resend.com/docs)

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

**Happy coding! 🎉**
