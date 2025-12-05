"use cache";

import { Suspense } from "react";
import Link from "next/link";
import { AppContainer } from "@/components/server";
import { DashboardClient } from "./client";

// Stat Card Component - Reusable card for displaying metrics (cached)
const StatCard = ({
  label,
  value,
  description,
}: {
  label: string;
  value: string | number;
  description?: string;
}) => {
  return (
    <div className="border rounded-lg p-6">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
};

// Quick Actions Component - Common actions users might take (cached)
const QuickActions = () => {
  const actions = [
    {
      label: "Documentation",
      href: "/documentation",
      description: "Learn how to use this template",
    },
    {
      label: "API Reference",
      href: "/api-reference",
      description: "Explore available functions",
    },
  ];

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="font-medium text-sm">{action.label}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {action.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Recent Activity Component - Shows recent user activity placeholder (cached)
const RecentActivity = () => {
  const activities = [
    { action: "Account created", time: "Just now" },
    { action: "Logged in", time: "Just now" },
  ];

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <span>{activity.action}</span>
            <span className="text-muted-foreground text-xs">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Cached static content
const DashboardStaticContent = () => {
  return (
    <>
      {/* Stats Grid - Replace with your own metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Users" value="1" description="Active accounts" />
        <StatCard label="Projects" value="0" description="Active projects" />
        <StatCard
          label="Status"
          value="Active"
          description="All systems operational"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>

      {/* Getting Started Section (Remove this after setup) */}
      <div className="border rounded-lg p-6 bg-muted/30">
        <h2 className="text-lg font-medium mb-3">Getting Started</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This is a boilerplate dashboard. Customize it by:
        </p>
        <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
          <li>Replacing StatCard values with your own Convex queries</li>
          <li>Adding your own components and sections</li>
          <li>Creating new pages in the /dashboard directory</li>
          <li>Customizing the layout to fit your needs</li>
        </ul>
        <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
          Edit this file:{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded">
            src/app/(auth)/dashboard/page.tsx
          </code>
        </div>
      </div>
    </>
  );
};

// Main Page Export - Server Component with cached content
export default async function DashboardPage() {
  "use cache";
  return (
    <AppContainer>
      <Suspense
        fallback={<div className="animate-pulse h-16 bg-muted rounded-lg" />}
      >
        <DashboardClient>
          <DashboardStaticContent />
        </DashboardClient>
      </Suspense>
    </AppContainer>
  );
}
