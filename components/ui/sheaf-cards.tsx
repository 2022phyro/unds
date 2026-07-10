"use client";

import React from "react";

interface NoteSheafCardProps {
  children: React.ReactNode;
  className?: string;
  /**
   * The primary theme color. 
   * Both the borders and the sheet backgrounds will graduate using this base color!
   * If omitted, it defaults to --primary, which already flips per theme
   * (black-forest in light mode, sage in dark mode) — so the card border
   * is always a color that reads clearly against --background.
   */
  fillColor?: string;
}

export default function NoteSheafCard({ 
  children, 
  className = "", 
  fillColor
}: NoteSheafCardProps) {
  
  const customStyle = {
    /* If no color is passed, fall back to --primary, which is already
       theme-aware (dark green in light mode, sage in dark mode). */
    "--sheaf-base": fillColor || "var(--primary)",
    
    /* Dynamically calculate backgrounds based on the theme color.
      - No fillColor: fall back to --sheaf-paper-bg / --sheaf-stacked-bg,
        which are defined in globals.css per theme (off-white sheets in
        light mode, sage-tinted lifted-dark sheets in dark mode).
      - fillColor passed: mix it directly into the paper, same as before.
    */
    "--sheaf-paper-front": fillColor 
      ? `color-mix(in srgb, var(--sheaf-base) 4%, #fcfbf9)`
      : `var(--sheaf-paper-bg)`,
      
    "--sheaf-paper-stacked": fillColor 
      ? `color-mix(in srgb, var(--sheaf-base) 2%, #ffffff)`
      : `var(--sheaf-stacked-bg)`,
  } as React.CSSProperties;

  return (
    <div 
      className={`relative p-1 group select-none w-full ${className}`}
      style={customStyle}
    >
      {/* Bottom stacked sheet of paper */}
      <div 
        className="absolute inset-0 translate-x-[6px] translate-y-[6px] rotate-[1deg] border rounded-xs transition-transform duration-300 group-hover:translate-x-[8px] group-hover:translate-y-[8px]" 
        style={{ 
          borderColor: `color-mix(in srgb, var(--sheaf-base) 12%, transparent)`,
          backgroundColor: `var(--sheaf-paper-stacked)`
        }}
      />
      
      {/* Middle stacked sheet of paper */}
      <div 
        className="absolute inset-0 translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] border rounded-xs transition-transform duration-300 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" 
        style={{ 
          borderColor: `color-mix(in srgb, var(--sheaf-base) 25%, transparent)`,
          backgroundColor: `var(--sheaf-paper-stacked)`
        }}
      />
      
      {/* Primary Foreground Sheet */}
      <div 
        className="relative border rounded-xs p-6 shadow-xs text-left transition-colors duration-300 group-hover:filter group-hover:brightness-105"
        style={{ 
          borderColor: `var(--sheaf-base)`,
          backgroundColor: `var(--sheaf-paper-front)`
        }}
      >
        {/* Subtle physical book spine accent line on the left margin */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xs" 
          style={{ backgroundColor: `color-mix(in srgb, var(--sheaf-base) 15%, transparent)` }}
        />
        <div className="pl-2">{children}</div>
      </div>
    </div>
  );
}