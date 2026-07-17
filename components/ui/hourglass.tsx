"use client";

import React from "react";

interface HourglassLoaderProps {
  /** Width and height dimensions applied uniformly to the bounding box */
  size?: number | string;
  /** Optional secondary adjustments for centering within parent layout sheets */
  className?: string;
}

export default function HourglassLoader({ size = 120, className = "" }: HourglassLoaderProps) {
  return (
    <div 
      className={`flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 300 300" 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* ─── GLASS HULL SHIELD ──────────────────────────────────────── */}
        <g>
          {/* Inner Hourglass Profile (Translucent Lavender / Off-white Tinted Glass) */}
          <path 
            id="hg-glass-body" 
            d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z" 
            style={{ stroke: "#2e3a28", strokeWidth: 5, fill: "rgba(235, 230, 245, 0.45)" }} 
          />
          
          {/* Bounded Support Frame Pillars (Premium Deep Forest Green) */}
          <path 
            id="hg-frame-pillars" 
            d="M100,97 L200, 97 M100,203 L200,203 M110,97 L110,142 M110,158 L110,200 M190,97 L190,142 M190,158 L190,200 M110,150 L110,150 M190,150 L190,150" 
            style={{ stroke: "#2e3a28", strokeWidth: 6, strokeLinecap: "round" }} 
          />
          
          {/* Synchronized 180° Flip Rotators */}
          <animateTransform 
            xlinkHref="#hg-frame-pillars" 
            attributeName="transform" 
            type="rotate" 
            begin="0s" 
            dur="3.2s" 
            values="0 150 150; 0 150 150; 180 150 150" 
            keyTimes="0; 0.82; 1" 
            repeatCount="indefinite" 
          />
          <animateTransform 
            xlinkHref="#hg-glass-body" 
            attributeName="transform" 
            type="rotate" 
            begin="0s" 
            dur="3.2s" 
            values="0 150 150; 0 150 150; 180 150 150" 
            keyTimes="0; 0.82; 1" 
            repeatCount="indefinite" 
          />
        </g>
        
        {/* ─── DYNAMIC SAND METRICS (PRIMARY BRAND COLOR) ────────────────── */}
        <g>
          {/* Upper Reservoir Drain Block */}
          <polygon id="hg-sand-upper" points="120,125 180,125 150,147" style={{ fill: "#2e3a28" }}>
            <animate 
              attributeName="points" 
              dur="3.2s" 
              keyTimes="0; 0.82; 1" 
              values="120,125 180,125 150,147; 150,150 150,150 150,150; 150,150 150,150 150,150" 
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Continuous Drip Gravity Stream */}
          <path 
            id="hg-sand-stream" 
            strokeLinecap="round" 
            strokeDasharray="1,5" 
            strokeDashoffset="200.00" 
            stroke="#2e3a28" 
            strokeWidth="2.5" 
            d="M150,150 L150,198"
          >
            <animate attributeName="stroke-dashoffset" dur="3.2s" to="1.00" repeatCount="indefinite"/>
            <animate 
              attributeName="d" 
              dur="3.2s" 
              to="M150,195 L150,195" 
              values="M150,150 L150,198; M150,150 L150,198; M150,198 L150,198; M150,195 L150,195" 
              keyTimes="0; 0.68; 0.92; 1" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="stroke" 
              dur="3.2s" 
              keyTimes="0; 0.68; 0.82; 1" 
              values="#2e3a28;#2e3a28;transparent;transparent" 
              to="transparent" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* Lower Reservoir Gathering Stack */}
          <g id="hg-sand-lower">
            <path d="M150,180 L180,190 A28,10 0 1,1 120,190 L150,180 Z" style={{ stroke: "transparent", strokeWidth: 5, fill: "#2e3a28" }}>
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                keyTimes="0; 0.68; 1" 
                values="0 15; 0 0; 0 0" 
                dur="3.2s" 
                repeatCount="indefinite" 
              />
            </path>
            <animateTransform 
              xlinkHref="#hg-sand-lower" 
              attributeName="transform"
              type="rotate"
              begin="0s" 
              dur="3.2s"
              values="0 150 150; 0 150 150; 180 150 150"
              keyTimes="0; 0.82; 1"
              repeatCount="indefinite"
            />
          </g>
          
          {/* Lower Structural Glass Sheath Overlays */}
          <path d="M150,150 C60,85 240,85 150,150 C60,215 240,215 150,150 Z" style={{ stroke: "#2e3a28", strokeWidth: 5, fill: "transparent" }}>
            <animateTransform 
              attributeName="transform"
              type="rotate"
              begin="0s" 
              dur="3.2s"
              values="0 150 150; 0 150 150; 180 150 150"
              keyTimes="0; 0.82; 1"
              repeatCount="indefinite"
            />
          </path>
          
          <path d="M100,97 L200, 97 M100,203 L200,203" style={{ stroke: "#2e3a28", strokeWidth: 6, strokeLinecap: "round" }}>
            <animateTransform 
              attributeName="transform"
              type="rotate"
              begin="0s" 
              dur="3.2s"
              values="0 150 150; 0 150 150; 180 150 150"
              keyTimes="0; 0.82; 1"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}