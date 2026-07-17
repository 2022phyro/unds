"use client";

import React from "react";
import Link from "next/link";
import HourglassLoader from "@/components/ui/hourglass"; // Adjust path as needed
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/bookmark-button/button";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen text-[#2e3a28] font-manrope flex flex-col justify-center items-center px-6 relative overflow-hidden">
      
      {/* Subtle Background Layering */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply bg-[radial-gradient(#2e3a28_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Animated Brand Graphic */}
        <div className="flex justify-center">
          <div className="relative p-2">
            <HourglassLoader size={110} />
            {/* Soft background glow representing lost time */}
            <div className="absolute inset-0 bg-rgba(235, 230, 245, 0.2) blur-xl rounded-full -z-10 animate-pulse" />
          </div>
        </div>

        {/* Editorial Text Block */}
        <div className="space-y-3">
          <h1 className="font-garamond text-4xl font-black tracking-tight uppercase">
            Lost to the Sands
          </h1>
          <p className="font-garamond text-base text-[#2e3a28]/80 leading-relaxed max-w-sm mx-auto">
            The manuscript, argument layout, or archival record you are looking for has either drifted out of chronology or never existed.
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
          <div className="h-[1px] bg-[#2e3a28]/10 flex-1" />
          <BookOpen className="w-3.5 h-3.5 text-[#2e3a28]/30" />
          <div className="h-[1px] bg-[#2e3a28]/10 flex-1" />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#2e3a28]/20 bg-white hover:bg-white/60 text-[#2e3a28] tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return Back
          </button>
          
          <Button 
            className="w-40 h-10 border"
            aria-label="Go Home"
            onClick={() => window.location.href = "/"}
          >
            Go Home
          </Button>
        </div>

      </div>

    </div>
  );
}