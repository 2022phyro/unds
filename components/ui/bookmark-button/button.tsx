"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {

  // Outer interactive boundary. Handles layout context without padding styles.
  const baseClasses = `
    group relative inline-flex items-center justify-center 
    p-[4px] select-none focus:outline-none w-full sm:w-auto
  `;

  const innerContent = (
    <>
      {/* The Sophisticated Floating Grid Frame */}
      <span className="absolute bottom-0 right-0 top-[4px] left-[4px] btn  rounded-xs border border-button-ink/25 bg-foreground/5" />

      {/* The Dynamic Foreground Plaque
          Uses --button-surface / --button-ink rather than --surface / --text-primary:
          those two tokens are guaranteed to separate visibly from --background in
          BOTH themes, whereas --surface sits too close to --background in dark mode.
      */}
      <span className={`
        relative inline-flex items-center btn btn-primary justify-center rounded-xs border border-button-ink bg-button-surface 
        px-6 py-2.5 text-lg! font-bold font-garamond! tracking-[0.16em] text-button-ink
        
        /* Smooth Desktop Transitions */
        transition-all duration-200 ease-out 
        -translate-x-[4px] -translate-y-[4px]
        
        /* High-End Hover State */
        group-hover:bg-button-ink group-hover:text-button-surface
        
        /* The Mechanical Press Fix */
        group-active:translate-x-0 group-active:translate-y-0
        
        ${className ? className : "font-garamond"}
      `}>
        {/* Micro-scale adjustment on the text node itself */}
        <span className="inline-block transition-transform duration-100 group-active:scale-[0.97]">
          {children}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} disabled:opacity-50`}>
      {innerContent}
    </button>
  );
}