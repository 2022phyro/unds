"use client";

import { Button } from "./ui/bookmark-button";

interface ErrorUIProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorUI({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred. Please try again or return home.", 
  onRetry 
}: ErrorUIProps) {
  return (
    <div className=" min-h-screen flex items-center justify-center p-6 font-serif text-[#2e3a28]">
      <div className="max-w-md w-full bg-surface border flex flex-col gap-5 border-[#2e3a28]/20 p-12 text-center shadow-sm">
        <h1 className="text-4xl mb-4">{title}</h1>
        <p className="opacity-70 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex flex-row flex-wrap gap-6 justify-evenly items-center w-full">
          {onRetry && (
            <a 
              onClick={onRetry}
              className="w-full max-w-75 btn btn-primary py-4!"
            >
              Try Again
            </a >
          )}
          <a
            href="/" 
              className="w-full max-w-75 btn border border-primary! btn-outline py-4!"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}