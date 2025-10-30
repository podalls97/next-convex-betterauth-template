import {
  createClient,
} from "@convex-dev/better-auth";
import { components } from "./_generated/api";
import { query } from "./_generated/server";
import { DataModel, Id } from "./_generated/dataModel";
import { asyncMap } from "convex-helpers";

export const betterAuthComponent = createClient(components.betterAuth, {
  verbose: false,
  triggers: {
    user: {
      onCreate: async (ctx, user) => {
        // Example: copy the user's email to the application users table.
        await ctx.db.insert("users", {
          email: user.email,
        });
      },
      onUpdate: async (ctx, newUser, oldUser) => {
        // Keep the user's email synced
        const appUser = await ctx.db
          .query("users")
          .withIndex("email", (q) => q.eq("email", oldUser.email))
          .first();

        if (appUser && appUser._id) {
          await ctx.db.patch(appUser._id as Id<"users">, {
            email: newUser.email,
          });
        }
      },
      onDelete: async (ctx, user) => {
        // Delete the user's application data
        const appUser = await ctx.db
          .query("users")
          .withIndex("email", (q) => q.eq("email", user.email))
          .first();

        if (appUser && appUser._id) {
          // Delete the user's todos
          const todos = await ctx.db
            .query("todos")
            .withIndex("userId", (q) => q.eq("userId", appUser._id as Id<"users">))
            .collect();
          await asyncMap(todos, async (todo) => {
            if (todo && todo._id) {
              await ctx.db.delete(todo._id as Id<"todos">);
            }
          });
          // Delete the user
          await ctx.db.delete(appUser._id as Id<"users">);
        }
      },
    },
  },
});

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const betterAuthUser = await betterAuthComponent.safeGetAuthUser(ctx as any);
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