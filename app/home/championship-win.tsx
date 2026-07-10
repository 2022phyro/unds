"use client";

import React from "react";
import CHAMPIONSHIP_WINS from "./data/championship-wins.json";

const ROTATIONS = [
  "group-hover:-rotate-2 rotate-1",
  "group-hover:rotate-3 -rotate-1",
  "group-hover:-rotate-3 rotate-2",
  "group-hover:rotate-2 -rotate-2"
];

export function ChampionshipWins() {
  // Graceful fallback condition to prevent blank loading issues if data array is parsing asynchronously
  if (!CHAMPIONSHIP_WINS || CHAMPIONSHIP_WINS.length === 0) return null;

  return (
    <div className="w-full space-y-16 flex flex-col gap-6 lg:gap-0 md:gap-6 lg:space-y-24">
      {CHAMPIONSHIP_WINS.map((win, idx) => {
        const isEven = idx % 2 === 0;
        const rotationClass = ROTATIONS[idx % ROTATIONS.length];
        
        return (
          <div 
            key={`${win.title}-${idx}`}
            className={`flex flex-col md:gap-10 sm:gap-3 items-center justify-center md:justify-end ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* TEXT DOSSIER BLOCK */}
            <div className="w-auto md:max-w-md lg:max-w-lg space-y-2">
              <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-accent">
                <span>// {win.year}</span>
                <span className="text-text-muted/40">•</span>
                <span className="uppercase">{win.circuit}</span>
              </div>
              
              <h3 className="font-garamond text-2xl sm:text-3xl font-light tracking-tight text-text-primary m-0">
                {win.title}
              </h3>
              <p>Raymond and Chinedu</p>
              <p className="font-garamond text-base sm:text-lg text-text-secondary leading-normal m-0">
                {win.tier}
              </p>
            </div>

            {/* ARTICULATED TILTED PHOTO LAYER — Hard heights ensure layout engine paint stability */}
            <div className="w-full md:w-72 lg:w-96 shrink-0 flex items-center justify-center p-2">
              <div 
                className={`relative w-full h-52 sm:h-60 md:h-64 lg:h-68 rounded-xl border border-border bg-surface overflow-hidden shadow-xs transition-all duration-500 ease-out ${rotationClass}`}
              >
                <img 
                  src={win.imageUrl} 
                  alt={`${win.title} Snapshot`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
