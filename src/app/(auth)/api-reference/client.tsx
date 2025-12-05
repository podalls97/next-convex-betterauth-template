"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
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
  const [signOutLoading, setSignOutLoading] = useState(false);

  const handleSignOut = async () => {
    setSignOutLoading(true);
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
        <SignOutButton onClick={handleSignOut} loading={signOutLoading} />
      </AppNav>
    </AppHeader>
  );
};

// Client wrapper for API reference
export function ApiReferenceClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
