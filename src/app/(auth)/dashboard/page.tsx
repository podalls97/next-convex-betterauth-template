"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Toaster } from "sonner";

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

const WelcomeMessage = () => {
  const user = useQuery(api.auth.getCurrentUser);
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Hey {user?.name || user?.email || "User"}, You're back! 🎉
        </h1>
        <p className="text-xl text-muted-foreground">
          Your authentication is complete and working perfectly!
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
              Authentication System Ready
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Your Better Auth setup is fully configured and operational
            </p>
          </div>
        </div>
      </div>

      {/* Guide Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Next Steps: Building Your App</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Create New Pages */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
              </div>
              <h3 className="text-lg font-semibold">Create New Pages</h3>
            </div>
            <div className="ml-11 space-y-2">
              <p className="text-muted-foreground">
                Add new pages inside the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">/dashboard</code> directory
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                <div className="text-gray-600 dark:text-gray-400"># Example structure:</div>
                <div className="text-blue-600 dark:text-blue-400">/dashboard/profile/page.tsx</div>
                <div className="text-blue-600 dark:text-blue-400">/dashboard/settings/page.tsx</div>
                <div className="text-blue-600 dark:text-blue-400">/dashboard/analytics/page.tsx</div>
              </div>
            </div>
          </div>

          {/* Protected Routes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">2</span>
              </div>
              <h3 className="text-lg font-semibold">Protected Routes</h3>
            </div>
            <div className="ml-11 space-y-2">
              <p className="text-muted-foreground">
                All pages in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">(auth)</code> are automatically protected
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                <div className="text-green-600 dark:text-green-400">✓ User authentication required</div>
                <div className="text-green-600 dark:text-green-400">✓ Automatic redirect to sign-in</div>
                <div className="text-green-600 dark:text-green-400">✓ Session management handled</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Code */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Quick Start Template
          </h4>
          <div className="bg-black text-green-400 p-4 rounded text-sm font-mono overflow-x-auto">
            <div>(// Create: /dashboard/my-page/page.tsx)</div>
            <div className="text-blue-400">&quot;use client&quot;;</div>
            <div className="text-blue-400">import {`{`} useQuery {`}`} from &quot;convex/react&quot;;</div>
            <div className="text-blue-400">import {`{`} api {`}`} from &quot;../../../../convex/_generated/api&quot;;</div>
            <div className="text-blue-400">import {`{`} AppContainer {`}`} from &quot;@/components/server&quot;;</div>
            <div></div>
            <div className="text-yellow-400">export default function MyPage() {`{`}</div>
            <div className="text-gray-400">  const user = useQuery(api.auth.getCurrentUser);</div>
            <div></div>
            <div className="text-gray-400">  return (</div>
            <div className="text-gray-400">    &lt;AppContainer&gt;</div>
            <div className="text-gray-400">      &lt;h1&gt;Hello {`{`}user?.name{`}`}!&lt;/h1&gt;</div>
            <div className="text-gray-400">    &lt;/AppContainer&gt;</div>
            <div className="text-gray-400">  );</div>
            <div className="text-yellow-400">{`}`}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Ready to build something amazing? Start by creating your first page!</p>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <AppContainer>
      
      <Header />
      <WelcomeMessage />
      <Toaster />
    </AppContainer>
  );
}
