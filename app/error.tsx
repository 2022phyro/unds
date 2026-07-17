"use client";

import { ErrorUI } from "@/components/error-ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the specific error to the server console privately
  console.error("Application Error:", error);

  return (
    <ErrorUI 
      title="System Error" 
      message="We encountered an issue processing your request. Please try again." 
      onRetry={reset}
    />
  );
}