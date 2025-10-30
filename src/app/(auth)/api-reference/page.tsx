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

const ApiEndpoint = ({
  method,
  path,
  description,
  params,
  example,
}: {
  method: string;
  path: string;
  description: string;
  params?: { name: string; type: string; description: string }[];
  example?: string;
}) => {
  const methodColors = {
    GET: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950",
    POST: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950",
    PUT: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950",
    DELETE: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950",
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-mono font-semibold px-2 py-1 rounded ${
            methodColors[method as keyof typeof methodColors] || ""
          }`}
        >
          {method}
        </span>
        <code className="text-sm font-mono">{path}</code>
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>

      {params && params.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Parameters</h4>
          <div className="space-y-2">
            {params.map((param) => (
              <div key={param.name} className="text-sm">
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  {param.name}
                </code>
                <span className="text-muted-foreground text-xs ml-2">
                  {param.type}
                </span>
                <p className="text-muted-foreground text-xs mt-1 ml-4">
                  {param.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {example && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Example</h4>
          <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
            {example}
          </pre>
        </div>
      )}
    </div>
  );
};

const ApiSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

const ApiReferenceContent = () => {
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
        <h1 className="text-2xl font-semibold">API Reference</h1>
        <p className="text-muted-foreground">
          Available Convex functions and authentication endpoints
        </p>
        <div className="flex gap-2 pt-2">
          <Link
            href="/documentation"
            className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Documentation →
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* Authentication APIs - Client Side */}
        <ApiSection title="Authentication - Client Side">
          <ApiEndpoint
            method="GET"
            path="api.auth.getCurrentUser"
            description="Get the currently authenticated user with their profile data (merges Better Auth data with application user data)"
            example={`import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const user = useQuery(api.auth.getCurrentUser);
// Returns: { _id, email, name, image, emailVerified, ... }
// undefined if loading, null if not authenticated`}
          />

          <ApiEndpoint
            method="POST"
            path="authClient.signIn.email()"
            description="Sign in with email and password"
            params={[
              { name: "email", type: "string", description: "User's email address" },
              { name: "password", type: "string", description: "User's password" },
              { name: "rememberMe", type: "boolean?", description: "Keep user signed in (optional)" },
            ]}
            example={`import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
  rememberMe: true,
});

if (error) {
  console.error("Sign in failed:", error.message);
}`}
          />

          <ApiEndpoint
            method="POST"
            path="authClient.signUp.email()"
            description="Create a new account with email and password"
            params={[
              { name: "email", type: "string", description: "User's email address" },
              { name: "password", type: "string", description: "User's password (min 8 chars)" },
              { name: "name", type: "string", description: "User's display name" },
            ]}
            example={`import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.signUp.email({
  email: "newuser@example.com",
  password: "securePassword123",
  name: "John Doe",
});

if (error) {
  console.error("Sign up failed:", error.message);
} else {
  // User created, may need email verification
}`}
          />

          <ApiEndpoint
            method="POST"
            path="authClient.signIn.social()"
            description="Sign in with OAuth providers (Google, GitHub, Slack)"
            params={[
              { name: "provider", type: "'google' | 'github' | 'slack'", description: "OAuth provider name" },
              { name: "callbackURL", type: "string?", description: "Redirect URL after auth (optional)" },
            ]}
            example={`import { authClient } from "@/lib/auth-client";

// Google OAuth
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
});

// GitHub OAuth
await authClient.signIn.social({
  provider: "github",
});`}
          />

          <ApiEndpoint
            method="POST"
            path="authClient.signIn.magicLink()"
            description="Send a magic link to user's email for passwordless authentication"
            params={[
              { name: "email", type: "string", description: "User's email address" },
            ]}
            example={`import { authClient } from "@/lib/auth-client";

await authClient.signIn.magicLink({
  email: "user@example.com",
});
// User will receive an email with a sign-in link`}
          />

          <ApiEndpoint
            method="POST"
            path="authClient.twoFactor.enable()"
            description="Enable two-factor authentication for the current user"
            example={`import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.twoFactor.enable({
  password: "currentPassword",
});

if (data) {
  // data contains QR code URI and backup codes
  console.log("QR Code:", data.qrCodeUri);
  console.log("Backup codes:", data.backupCodes);
}`}
          />

          <ApiEndpoint
            method="POST"
            path="authClient.signOut()"
            description="Sign out the current user and clear their session"
            example={`import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const router = useRouter();

await authClient.signOut();
router.push("/sign-in");`}
          />

          <ApiEndpoint
            method="GET"
            path="authClient.useSession()"
            description="React hook to get the current session (client-side)"
            example={`import { authClient } from "@/lib/auth-client";

function MyComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Hello {session.user.name}</div>;
}`}
          />
        </ApiSection>

        {/* Authentication APIs - Server Side */}
        <ApiSection title="Authentication - Server Side (Convex Functions)">
          <ApiEndpoint
            method="GET"
            path="betterAuthComponent.getAuthUser(ctx)"
            description="Get the authenticated user in a Convex function"
            example={`import { query } from "./_generated/server";
import { betterAuthComponent } from "./auth";

export const myProtectedQuery = query({
  args: {},
  handler: async (ctx) => {
    const user = await betterAuthComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // user contains Better Auth user data
    return { userId: user.id, email: user.email };
  },
});`}
          />

          <ApiEndpoint
            method="GET"
            path="api.auth.getCurrentUser (implementation)"
            description="Example of merging auth user with application user data"
            example={`import { query } from "./_generated/server";
import { betterAuthComponent } from "./auth";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await betterAuthComponent.getAuthUser(ctx);
    if (!authUser) return null;

    // Get application user data
    const user = await ctx.db
      .query("users")
      .withIndex("userId", (q) => q.eq("userId", authUser.id))
      .first();

    if (!user) return null;

    // Merge auth metadata with app data
    return {
      ...user,
      email: authUser.email,
      name: authUser.name,
      image: authUser.image,
      emailVerified: authUser.emailVerified,
    };
  },
});`}
          />

          <ApiEndpoint
            method="POST"
            path="Protected Mutation Example"
            description="Example of a mutation that requires authentication"
            example={`import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { betterAuthComponent } from "./auth";

export const createItem = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const authUser = await betterAuthComponent.getAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }

    // Get app user
    const user = await ctx.db
      .query("users")
      .withIndex("userId", (q) => q.eq("userId", authUser.id))
      .first();

    if (!user) throw new Error("User not found");

    // Create item linked to user
    const itemId = await ctx.db.insert("items", {
      userId: user._id,
      title: args.title,
      description: args.description,
      createdAt: Date.now(),
    });

    return itemId;
  },
});`}
          />
        </ApiSection>

        {/* Custom Convex Functions */}
        <ApiSection title="Custom Functions">
          <div className="border rounded-lg p-6 space-y-3">
            <h3 className="text-sm font-medium">Creating Custom Functions</h3>
            <p className="text-sm text-muted-foreground">
              Add your own Convex functions in the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">convex/</code> directory:
            </p>
            <pre className="bg-muted p-4 rounded text-xs font-mono overflow-x-auto">
{`// convex/myModule.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const myQuery = query({
  args: { id: v.id("tableName") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const myMutation = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tableName", {
      name: args.name,
    });
  },
});`}
            </pre>
            <p className="text-sm text-muted-foreground">
              Then use them in your components:
            </p>
            <pre className="bg-muted p-4 rounded text-xs font-mono overflow-x-auto">
{`import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const data = useQuery(api.myModule.myQuery, { id });
const mutate = useMutation(api.myModule.myMutation);

await mutate({ name: "value" });`}
            </pre>
          </div>
        </ApiSection>

        {/* Convex Utilities */}
        <ApiSection title="Convex React Hooks">
          <ApiEndpoint
            method="GET"
            path="useQuery(api.module.function, args)"
            description="Subscribe to a Convex query that updates in real-time"
            params={[
              { name: "function", type: "QueryReference", description: "The query function to call" },
              { name: "args", type: "object", description: "Arguments to pass to the query" },
            ]}
            example={`const data = useQuery(api.module.myQuery, { id: "123" });
// data updates automatically when database changes
// Returns undefined while loading, then your data

if (data === undefined) return <div>Loading...</div>;
if (data === null) return <div>Not found</div>;
return <div>{data.name}</div>;`}
          />

          <ApiEndpoint
            method="POST"
            path="useMutation(api.module.function)"
            description="Get a mutation function to modify data"
            params={[
              { name: "function", type: "MutationReference", description: "The mutation function to call" },
            ]}
            example={`const mutate = useMutation(api.module.myMutation);

// Use in event handlers
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const result = await mutate({ name: "value" });
    console.log("Created:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};`}
          />

          <ApiEndpoint
            method="POST"
            path="useAction(api.module.function)"
            description="Get an action function for long-running or external operations"
            params={[
              { name: "function", type: "ActionReference", description: "The action function to call" },
            ]}
            example={`const action = useAction(api.module.myAction);

// Actions can call external APIs, use fetch, etc.
const handleExternalCall = async () => {
  const result = await action({
    apiKey: "key",
    param: "value"
  });
  console.log("External API result:", result);
};`}
          />
        </ApiSection>

        {/* Advanced Patterns */}
        <ApiSection title="Advanced Patterns">
          <ApiEndpoint
            method="GET"
            path="Pagination Example"
            description="Implement paginated queries for large datasets"
            example={`// convex/items.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const listItems = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("items")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

// In component
import { usePaginatedQuery } from "convex/react";

const { results, status, loadMore } = usePaginatedQuery(
  api.items.listItems,
  {},
  { initialNumItems: 10 }
);

// results is array of items
// status is "CanLoadMore" | "LoadingMore" | "Exhausted"
// loadMore(n) loads n more items`}
          />

          <ApiEndpoint
            method="POST"
            path="File Upload Pattern"
            description="Handle file uploads using Convex storage"
            example={`// convex/files.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveFile = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("files", {
      storageId: args.storageId,
      fileName: args.fileName,
      uploadedAt: Date.now(),
    });
  },
});

// In component
const generateUploadUrl = useMutation(api.files.generateUploadUrl);
const saveFile = useMutation(api.files.saveFile);

const handleUpload = async (file: File) => {
  // 1. Get upload URL
  const uploadUrl = await generateUploadUrl();

  // 2. Upload file
  const result = await fetch(uploadUrl, {
    method: "POST",
    body: file,
  });
  const { storageId } = await result.json();

  // 3. Save metadata
  await saveFile({ storageId, fileName: file.name });
};`}
          />

          <ApiEndpoint
            method="POST"
            path="External API Call (Action)"
            description="Call external APIs from Convex actions"
            example={`// convex/external.ts
import { action } from "./_generated/server";
import { v } from "convex/values";

export const fetchExternalData = action({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Actions can use fetch
    const response = await fetch(
      \`https://api.example.com/users/\${args.userId}\`
    );
    const data = await response.json();

    // Actions can call mutations
    await ctx.runMutation(api.myModule.saveData, {
      data: data,
    });

    return data;
  },
});`}
          />

          <ApiEndpoint
            method="GET"
            path="Database Indexes"
            description="Query with indexes for better performance"
            example={`// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    userId: v.id("users"),
    title: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status", "createdAt"]),
});

// convex/items.ts - Using indexes
export const getUserItems = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("items")
      .withIndex("by_user", (q) =>
        q.eq("userId", args.userId)
      )
      .collect();
  },
});

export const getItemsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("items")
      .withIndex("by_status", (q) =>
        q.eq("status", args.status)
      )
      .order("desc") // orders by createdAt
      .take(50);
  },
});`}
          />

          <ApiEndpoint
            method="POST"
            path="Scheduled Functions (Crons)"
            description="Run functions on a schedule"
            example={`// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run daily at midnight UTC
crons.daily(
  "clean up old data",
  { hourUTC: 0, minuteUTC: 0 },
  internal.cleanup.deleteOldRecords
);

// Run every 5 minutes
crons.interval(
  "sync external data",
  { minutes: 5 },
  internal.sync.syncData
);

export default crons;

// convex/cleanup.ts
import { internalMutation } from "./_generated/server";

export const deleteOldRecords = internalMutation({
  args: {},
  handler: async (ctx) => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const oldRecords = await ctx.db
      .query("logs")
      .filter((q) => q.lt(q.field("createdAt"), thirtyDaysAgo))
      .collect();

    for (const record of oldRecords) {
      await ctx.db.delete(record._id);
    }
  },
});`}
          />

          <ApiEndpoint
            method="GET"
            path="Real-time Filtering"
            description="Use filters for dynamic queries"
            example={`import { query } from "./_generated/server";
import { v } from "convex/values";

export const searchItems = query({
  args: {
    searchTerm: v.string(),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("items").collect();

    // Filter by search term
    if (args.searchTerm) {
      results = results.filter((item) =>
        item.title
          .toLowerCase()
          .includes(args.searchTerm.toLowerCase())
      );
    }

    // Filter by status if provided
    if (args.status) {
      results = results.filter(
        (item) => item.status === args.status
      );
    }

    return results;
  },
});`}
          />
        </ApiSection>

        {/* Error Handling & Best Practices */}
        <ApiSection title="Error Handling & Best Practices">
          <ApiEndpoint
            method="GET"
            path="Error Handling in Queries"
            description="Handle errors gracefully in queries and mutations"
            example={`// In Convex functions
export const myQuery = query({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  },
});

// In components
const MyComponent = () => {
  const data = useQuery(api.module.myQuery, { id });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  // Query errors are thrown and can be caught with ErrorBoundary
  return <div>{data.name}</div>;
};

// With mutation error handling
const handleSubmit = async () => {
  try {
    await mutate({ data });
    toast.success("Success!");
  } catch (error) {
    toast.error(error.message || "Failed to save");
  }
};`}
          />

          <ApiEndpoint
            method="GET"
            path="TypeScript Types"
            description="Use generated types for type safety"
            example={`import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Doc } from "@/convex/_generated/dataModel";

// Use Doc for document types
type User = Doc<"users">;
type Todo = Doc<"todos">;

// Use Id for document IDs
const userId: Id<"users"> = "..." as Id<"users">;

// Type-safe function arguments
import { FunctionArgs } from "convex/server";
type CreateItemArgs = FunctionArgs<typeof api.items.create>;

// Type-safe return values
import { FunctionReturnType } from "convex/server";
type UserData = FunctionReturnType<typeof api.auth.getCurrentUser>;`}
          />

          <ApiEndpoint
            method="GET"
            path="Optimistic Updates"
            description="Update UI immediately for better UX"
            example={`const optimisticCreate = useOptimisticMutation(
  api.items.create
);

const [optimisticItems, setOptimisticItems] = useState<Item[]>([]);
const items = useQuery(api.items.list) || [];

const allItems = [...items, ...optimisticItems];

const handleCreate = async (newItem: NewItem) => {
  const tempId = crypto.randomUUID();
  const optimistic = { ...newItem, _id: tempId };

  // Add to optimistic state immediately
  setOptimisticItems((prev) => [...prev, optimistic]);

  try {
    await optimisticCreate(newItem);
    // Remove from optimistic state on success
    setOptimisticItems((prev) =>
      prev.filter((item) => item._id !== tempId)
    );
  } catch (error) {
    // Remove and show error
    setOptimisticItems((prev) =>
      prev.filter((item) => item._id !== tempId)
    );
    toast.error("Failed to create item");
  }
};`}
          />

          <ApiEndpoint
            method="GET"
            path="Best Practices"
            description="Follow these patterns for robust applications"
            example={`// 1. Always validate args with Convex validators
export const myMutation = mutation({
  args: {
    email: v.string(),
    age: v.number(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => { /* ... */ },
});

// 2. Use indexes for efficient queries
// Define in schema.ts:
.index("by_user_and_status", ["userId", "status"])

// 3. Keep queries fast (<1s)
// For heavy computation, use actions instead

// 4. Handle authentication consistently
const authUser = await betterAuthComponent.getAuthUser(ctx);
if (!authUser) throw new Error("Unauthorized");

// 5. Use pagination for large datasets
// Instead of .collect(), use .paginate()

// 6. Avoid N+1 queries
// Batch related queries when possible

// 7. Use proper TypeScript types
// Import from _generated/dataModel

// 8. Test edge cases
// Null checks, empty arrays, missing fields

// 9. Use transactions for related updates
// All mutations are atomic by default

// 10. Monitor function performance
// Check dashboard for slow queries`}
          />
        </ApiSection>

        {/* Additional Resources */}
        <div className="border rounded-lg p-6 bg-muted/30">
          <h3 className="text-sm font-medium mb-3">Additional Resources</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <Link href="/documentation" className="hover:text-foreground underline">
                Project Documentation
              </Link>
              {" - Setup guide and architecture overview"}
            </li>
            <li>
              <a
                href="https://docs.convex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline"
              >
                Convex Documentation
              </a>
              {" - Official Convex docs"}
            </li>
            <li>
              <a
                href="https://better-auth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline"
              >
                Better Auth Documentation
              </a>
              {" - Official Better Auth docs"}
            </li>
            <li>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline"
              >
                Next.js Documentation
              </a>
              {" - Official Next.js docs"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function ApiReferencePage() {
  return (
    <AppContainer>
      <Header />
      <ApiReferenceContent />
    </AppContainer>
  );
}
