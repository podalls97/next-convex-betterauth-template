"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Toaster } from "sonner";
import {
  AppHeader,
  AppNav,
  SettingsButton,
  SettingsButtonContent,
  UserProfile,
} from "@/components/server";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SignOutButton } from "@/components/client";

// Header Component - Shows user profile and navigation (client-side)
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

// Dynamic welcome section
const WelcomeSection = () => {
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground mt-1">
        Welcome back, {user?.name || user?.email}
      </p>
    </div>
  );
};

// Client wrapper for dashboard
export function DashboardClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="space-y-8">
        <WelcomeSection />
        {children}
      </div>
      <Toaster />
    </>
  );
}
