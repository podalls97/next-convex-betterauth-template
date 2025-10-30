"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import {
  AppContainer,
  AppHeader,
  AppNav,
  SettingsButton,
  SettingsButtonContent,
  UserProfile,
} from "@/components/server";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SignOutButton } from "@/components/client";

const Header = () => {
  const router = useRouter();
  const user = useQuery(api.auth.getCurrentUser);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <AppHeader>
      <UserProfile user={user} />
      <AppNav>
        <SettingsButton>
          <Link href="/settings">
            <SettingsButtonContent />
          </Link>
        </SettingsButton>
        <SignOutButton onClick={handleSignOut} />
      </AppNav>
    </AppHeader>
  );
};

const DocSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="text-sm text-muted-foreground space-y-2">{children}</div>
    </div>
  );
};

const CodeBlock = ({ children }: { children: string }) => {
  return (
    <pre className="bg-muted p-4 rounded-lg text-xs font-mono overflow-x-auto">
      {children}
    </pre>
  );
};

const DocumentationContent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-semibold">Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to use this Next.js + Convex + Better Auth template
        </p>
        <div className="flex gap-2 pt-2">
          <Link
            href="/api-reference"
            className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View API Reference →
          </Link>
        </div>
      </div>

      <div className="border rounded-lg p-6 space-y-8">
        {/* Tech Stack */}
        <DocSection title="Tech Stack">
          <ul className="list-disc list-inside space-y-1">
            <li>Next.js 16 with App Router and React 19</li>
            <li>Convex - Real-time backend database</li>
            <li>Better Auth - Authentication with email, OAuth, 2FA</li>
            <li>TypeScript - Full type safety</li>
            <li>Tailwind CSS v4 - Styling with dark mode</li>
          </ul>
        </DocSection>

        {/* Getting Started */}
        <DocSection title="Getting Started">
          <p>Start the development server (runs both Convex backend and Next.js frontend):</p>
          <CodeBlock>pnpm dev</CodeBlock>

          <p className="mt-4">Other useful commands:</p>
          <CodeBlock>{`# Start only frontend (Convex must be running separately)
pnpm dev:frontend

# Start only Convex backend
pnpm dev:backend

# Run Convex once and exit
pnpm convex dev --once

# Build for production
pnpm build

# Run linting
pnpm lint`}</CodeBlock>
        </DocSection>

        {/* Project Structure */}
        <DocSection title="Project Structure">
          <CodeBlock>{`src/app/
├── (auth)/          # Protected routes
│   ├── dashboard/   # Main dashboard
│   └── settings/    # User settings
├── (unauth)/        # Public routes
│   ├── sign-in/     # Login page
│   └── sign-up/     # Registration page

convex/
├── auth.ts          # Auth configuration
├── schema.ts        # Database schema
└── http.ts          # HTTP endpoints`}</CodeBlock>
        </DocSection>

        {/* Creating Pages */}
        <DocSection title="Creating New Pages">
          <p>Create a new protected page:</p>
          <CodeBlock>{`// src/app/(auth)/my-page/page.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AppContainer } from "@/components/server";

export default function MyPage() {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <AppContainer>
      <h1>Hello {user?.name}</h1>
    </AppContainer>
  );
}`}</CodeBlock>
          <p>
            All pages in the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">(auth)</code> directory
            are automatically protected by the authentication proxy.
          </p>
        </DocSection>

        {/* Using Convex */}
        <DocSection title="Using Convex">
          <p>Query data from Convex:</p>
          <CodeBlock>{`import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const data = useQuery(api.myModule.myFunction);`}</CodeBlock>
          <p>Mutate data:</p>
          <CodeBlock>{`import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const mutate = useMutation(api.myModule.myFunction);
await mutate({ arg: "value" });`}</CodeBlock>
        </DocSection>

        {/* Authentication */}
        <DocSection title="Authentication">
          <p>Get current user:</p>
          <CodeBlock>{`const user = useQuery(api.auth.getCurrentUser);`}</CodeBlock>
          <p>Sign out:</p>
          <CodeBlock>{`import { authClient } from "@/lib/auth-client";

await authClient.signOut();`}</CodeBlock>
        </DocSection>

        {/* Authentication Architecture */}
        <DocSection title="Authentication Architecture">
          <p>This template uses a dual-system authentication architecture:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Better Auth Server</strong> (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">src/lib/auth.ts</code>):
              Configures providers, email verification, 2FA, magic links
            </li>
            <li>
              <strong>Better Auth Client</strong> (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">src/lib/auth-client.ts</code>):
              React hooks and client methods for auth operations
            </li>
            <li>
              <strong>Convex Auth Component</strong> (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/auth.ts</code>):
              Connects Better Auth to Convex database with lifecycle hooks
            </li>
            <li>
              <strong>HTTP Routes</strong> (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/http.ts</code>):
              Registers Better Auth API endpoints
            </li>
            <li>
              <strong>Route Protection</strong> (<code className="bg-muted px-1.5 py-0.5 rounded text-xs">src/proxy.ts</code>):
              Middleware that protects routes and redirects unauthenticated users
            </li>
          </ul>
          <p className="mt-4">
            Authentication supports: Email/Password, Google OAuth, GitHub OAuth, Slack OAuth,
            Magic Links, Email OTP, 2FA, and Anonymous authentication.
          </p>
        </DocSection>

        {/* Adding OAuth Providers */}
        <DocSection title="Adding OAuth Providers">
          <p>To add or remove OAuth providers:</p>
          <div className="space-y-4 ml-4">
            <div>
              <p className="font-medium">1. Update server configuration:</p>
              <CodeBlock>{`// src/lib/auth.ts
// Add to socialProviders or genericOAuth config`}</CodeBlock>
            </div>
            <div>
              <p className="font-medium">2. Update client configuration:</p>
              <CodeBlock>{`// src/lib/auth-client.ts
// Add corresponding client plugin`}</CodeBlock>
            </div>
            <div>
              <p className="font-medium">3. Set environment variables:</p>
              <CodeBlock>{`# .env.local
PROVIDER_CLIENT_ID=your-id
PROVIDER_CLIENT_SECRET=your-secret

# Convex
pnpm convex env set PROVIDER_CLIENT_ID your-id
pnpm convex env set PROVIDER_CLIENT_SECRET your-secret`}</CodeBlock>
            </div>
            <div>
              <p className="font-medium">4. Update UI components to add provider buttons</p>
            </div>
          </div>
        </DocSection>

        {/* Environment Variables */}
        <DocSection title="Environment Variables">
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 mb-4">
            <p className="font-medium text-yellow-900 dark:text-yellow-200">
              ⚠️ Critical: Environment variables must be set in BOTH .env.local (for Next.js) AND Convex (for backend functions)
            </p>
          </div>

          <p className="font-medium">Required in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.env.local</code>:</p>
          <CodeBlock>{`# Convex (auto-generated after first deploy)
CONVEX_DEPLOYMENT=automatic
NEXT_PUBLIC_CONVEX_URL=https://example.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://example.convex.site

# Site URL
SITE_URL=http://localhost:3000

# Better Auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-secret-here

# OAuth Providers (optional - only if using OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret`}</CodeBlock>

          <p className="font-medium mt-4">Must also be set in Convex using these commands:</p>
          <CodeBlock>{`# Generate auth secret first
openssl rand -base64 32

# Set in Convex (development)
pnpm convex env set SITE_URL http://localhost:3000
pnpm convex env set BETTER_AUTH_SECRET your-secret-here

# Optional: OAuth providers
pnpm convex env set GOOGLE_CLIENT_ID your-google-client-id
pnpm convex env set GOOGLE_CLIENT_SECRET your-google-client-secret
pnpm convex env set GITHUB_CLIENT_ID your-github-client-id
pnpm convex env set GITHUB_CLIENT_SECRET your-github-client-secret

# For production, add --prod flag
pnpm convex env set SITE_URL https://your-domain.com --prod
pnpm convex env set BETTER_AUTH_SECRET your-prod-secret --prod`}</CodeBlock>

          <p className="mt-4">
            List all Convex environment variables:
          </p>
          <CodeBlock>{`pnpm convex env list`}</CodeBlock>
        </DocSection>

        {/* Deployment */}
        <DocSection title="Deployment">
          <p className="font-medium">Deploying to Vercel:</p>
          <div className="space-y-4">
            <div>
              <p>1. Set Vercel build settings:</p>
              <CodeBlock>{`Build Command: npx convex deploy --cmd 'pnpm run build'
Install Command: pnpm install`}</CodeBlock>
            </div>
            <div>
              <p>2. Add all environment variables from .env.local to Vercel</p>
            </div>
            <div>
              <p>3. Set production environment variables in Convex:</p>
              <CodeBlock>{`pnpm convex env set SITE_URL https://your-domain.com --prod
pnpm convex env set BETTER_AUTH_SECRET your-prod-secret --prod
pnpm convex env set GOOGLE_CLIENT_ID your-id --prod
pnpm convex env set GOOGLE_CLIENT_SECRET your-secret --prod
# etc. for all required variables`}</CodeBlock>
            </div>
            <div>
              <p>4. Deploy to Vercel:</p>
              <CodeBlock>{`vercel deploy --prod`}</CodeBlock>
            </div>
          </div>
        </DocSection>

        {/* Important Files */}
        <DocSection title="Important File Locations">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">src/proxy.ts</code> - Route protection middleware</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/auth.config.ts</code> - Better Auth domain configuration</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/schema.ts</code> - Database schema</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/polyfills.ts</code> - Required polyfills for Better Auth</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/email.tsx</code> - Email templates</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">next.config.ts</code> - Next.js configuration</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code> - Detailed technical documentation</li>
          </ul>
        </DocSection>

        {/* Next.js 16 Notes */}
        <DocSection title="Next.js 16 Specifics">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Turbopack is the default bundler (no --turbo flag needed)</li>
            <li>Uses React 19 with async server components</li>
            <li>Proxy pattern (src/proxy.ts) replaces old middleware.ts convention</li>
            <li>Full TypeScript support with strict type checking</li>
          </ul>
        </DocSection>

        {/* Additional Resources */}
        <DocSection title="Additional Resources">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              <Link href="/api-reference" className="text-primary hover:underline">
                API Reference
              </Link>
              {" - Comprehensive API documentation with code examples"}
            </li>
            <li>
              <a href="https://docs.convex.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Convex Documentation
              </a>
              {" - Official Convex docs"}
            </li>
            <li>
              <a href="https://better-auth.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Better Auth Documentation
              </a>
              {" - Official Better Auth docs"}
            </li>
            <li>
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Next.js Documentation
              </a>
              {" - Official Next.js docs"}
            </li>
            <li>
              See <code className="bg-muted px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code> for comprehensive technical documentation
            </li>
          </ul>
        </DocSection>
      </div>
    </div>
  );
};

export default function DocumentationPage() {
  return (
    <AppContainer>
      <Header />
      <DocumentationContent />
    </AppContainer>
  );
}
