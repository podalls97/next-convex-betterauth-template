import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { asyncMap } from "convex-helpers";
import { Id } from "./_generated/dataModel";

export const syncUserCreation = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      email: args.email,
    });
  },
});

export const syncUserDeletion = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const appUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (appUser) {
      const todos = await ctx.db
        .query("todos")
        .withIndex("userId", (q) => q.eq("userId", appUser._id))
        .collect();
      await asyncMap(todos, async (todo) => {
        await ctx.db.delete(todo._id);
      });
      await ctx.db.delete(appUser._id);
    }
  },
});
