import { createClient } from "@convex-dev/better-auth";
import { components } from "./_generated/api";
import { query } from "./_generated/server";
import { DataModel, Id } from "./_generated/dataModel";
import { asyncMap } from "convex-helpers";

export const betterAuthComponent = createClient<DataModel>(
  components.betterAuth
);

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    // Wrapped in try-catch to handle unauthenticated state gracefully
    let betterAuthUser;
    try {
      betterAuthUser = await betterAuthComponent.getAuthUser(ctx);
    } catch {
      // User is not authenticated
      return null;
    }

    if (!betterAuthUser) {
      return null;
    }

    // Get user data from your application's database
    const appUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", betterAuthUser.email))
      .first();

    // If no app user found, just return the Better Auth user data
    if (!appUser) {
      console.warn(`No app user found for email: ${betterAuthUser.email}`);
      return betterAuthUser;
    }

    // Merge app user data with Better Auth user data
    // Better Auth data takes precedence for fields like email, name, image
    return {
      ...appUser,
      ...betterAuthUser,
    };
  },
});
