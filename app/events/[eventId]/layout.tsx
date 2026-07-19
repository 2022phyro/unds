import React from "react";

interface EventLayoutProps {
  children: React.ReactNode;
}

export default function EventWorkspaceLayout({ children }: EventLayoutProps) {
  return <>{children}</>;
}