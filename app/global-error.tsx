"use client";

import { ErrorUI } from "@/components/error-ui";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#fcfaf7]">
        <ErrorUI 
          title="Critical System Error" 
          message="A major system error has occurred. Please refresh the page." 
          onRetry={reset}
        />
      </body>
    </html>
  );
}