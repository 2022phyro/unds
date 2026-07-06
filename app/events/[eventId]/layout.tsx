"use client";

import React from "react";

interface EventLayoutProps {
  children: React.ReactNode;
}

export default function EventWorkspaceLayout({ children }: EventLayoutProps) {
  return (
    // Max-w-none removes the layout container limits, stretching it fully wide
    <div className="w-full max-w-none bg-transparent">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}