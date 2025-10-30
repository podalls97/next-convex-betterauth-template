"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border text-sm text-muted-foreground">
      <div className="mx-auto w-full max-w-6xl px-2 md:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Podalls —
          <Link
            href="https://github.com/podalls97/next-convex-betterauth-template/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            MIT License
          </Link>
        </p>
        <Link
          href="https://github.com/podalls97/next-convex-betterauth-template"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
        >
          View source on GitHub
        </Link>
      </div>
    </footer>
  );
}


