"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  
  // Outer relative container that reserves the physical space for the 4px translation offset
  const baseClasses = `
    group relative inline-flex items-center justify-center 
    p-[4px] select-none focus:outline-none
    ${className}
  `;

  const innerContent = (
    <>
      {/* The Sophisticated Floating Grid Frame:
        Remains dead static in the background. It uses a clean, thin-ruled border 
        colored to your dark slate/forest brand palette.
      */}
      <span className="absolute bottom-0 right-0 top-[4px] left-[4px] rounded-xs border border-[#2e3a28]/30 bg-[#101913]/5" />
      
      {/* The Dynamic Foreground Plaque:
        - Hover: Background fills to solid dark forest green, and text crisp-inverts to white.
        - Active (:active): Translates exactly down and right to perfectly flatten onto the shadow plate.
      */}
      <span className="
        relative inline-flex items-center justify-center rounded-xs border border-[#2e3a28] bg-white 
        px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#2e3a28] font-garamond
        
        /* Smooth Desktop Transitions */
        transition-all duration-200 ease-out 
        -translate-x-[4px] -translate-y-[4px]
        
        /* High-End Hover State */
        group-hover:bg-[#2e3a28] group-hover:text-white
        
        /* The Mechanical Press Fix: Resolves the image_1b89a2.png static issue */
        group-active:translate-x-0 group-active:translate-y-0
      ">
        {/* Micro-scale adjustment on the text node itself for a physical stamp feeling */}
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
    <button type={type} onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
}