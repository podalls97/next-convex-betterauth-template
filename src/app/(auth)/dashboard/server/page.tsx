import { Toaster } from "sonner";
import Link from "next/link";
import {
  AppContainer,
  AppHeader,
  AppNav,
  SettingsButton,
  SettingsButtonContent,
} from "@/components/server";
import { createAuth } from "@/lib/auth";
import { preloadQuery } from "convex/nextjs";
import { getToken } from "@convex-dev/better-auth/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { SignOut, UserProfile } from "./client";
import { TodoList } from "./todo-list";
import { ModeToggle } from "@/app/mode-toggle";

const Header = async () => {
  const token = await getToken(createAuth);

  // Preload query for SSR
  const preloaded = await preloadQuery(api.auth.getCurrentUser, {}, { token });

  return (
    <AppHeader>
      <UserProfile preloadedUser={preloaded} />
      <AppNav>
        <SettingsButton>
          <Link href="/settings">
            <SettingsButtonContent />
          </Link>
        </SettingsButton>
        <SignOut />
      </AppNav>
    </AppHeader>
  );
};

const ServerPage = () => {
  return (
    <AppContainer>
      <ModeToggle />
      <Header />
      <TodoList />
      <Toaster />
    </AppContainer>
  );
};

export default ServerPage;
