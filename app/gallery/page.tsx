"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";

interface GalleryItem {
  id: string;
  exhibition: string;
  title: string;
  dateString: string;
  location: string;
  imageUrl: string;
  caption: string;
  motion?: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gf-frame-1",
    exhibition: "VARSITY_OPEN_2025",
    title: "Grand Finals Open Collision",
    dateString: "OCT 2025",
    location: "MAIN AUDITORIUM",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    caption: "Prime Minister delivering the opening dynamic extension casing during the final summary confrontation.",
    motion: "THW establish a centralized global climate migration fund managed by frontline climate-vulnerable states."
  },
  {
    id: "paudc-breaking",
    exhibition: "PAN_AFRICAN_2025",
    title: "The Contingent Break Announcement",
    dateString: "DEC 2025",
    location: "ACCRA, GHANA",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600",
    caption: "The moment the delegation secured three simultaneous breaking spots in the Open Quarterfinals."
  },
  {
    id: "public-debate-26",
    exhibition: "PUBLIC_FORUMS",
    title: "The Chancellor's Exhibition Cup",
    dateString: "FEB 2026",
    location: "ARTS THEATER",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600",
    caption: "An open public audience session addressing structural university funding reforms.",
    motion: "THBT public universities should fully transition to peer-governed voucher allocation frameworks."
  }
];

export default function GalleryExhibitionPage() {
  const [activeExhibition, setActiveExhibition] = useState<"ALL" | "VARSITY_OPEN_2025" | "PAN_AFRICAN_2025" | "PUBLIC_FORUMS">("ALL");
  const [selectedItem, setSelectedItem] = useState<GalleryItem>(GALLERY_DATA[0]);

  const filteredItems = useMemo(() => {
    return GALLERY_DATA.filter(item => activeExhibition === "ALL" || item.exhibition === activeExhibition);
  }, [activeExhibition]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 flex flex-col h-[calc(100vh-var(--header-height,4.5rem))] overflow-hidden">
      
      {/* STICKY ARCHIVE HEADER */}
      <SectionReveal className="bg-background pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-0.5">
            Visual Repositories
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            The Exhibition Ledger
          </h1>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex gap-1 border border-border bg-surface p-0.5 rounded-lg text-[10px] font-mono select-none shadow-xs overflow-x-auto">
          {(["ALL", "VARSITY_OPEN_2025", "PAN_AFRICAN_2025", "PUBLIC_FORUMS"] as const).map((exhibit) => (
            <button
              key={exhibit}
              onClick={() => setActiveExhibition(exhibit)}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all ${
                activeExhibition === exhibit
                  ? "bg-primary text-text-inverse font-bold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {exhibit.replace("_", " ")}
            </button>
          ))}
        </div>
      </SectionReveal>

      {/* CORE WORKSPACE VIEWPORT LAYOUT */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* LEFT COMPONENT LAYER: Selected High-Fidelity Active Display (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col h-full overflow-hidden bg-surface border border-border rounded-xl shadow-xs">
          {/* Main Visual Frame */}
          <div className="relative flex-1 bg-black overflow-hidden group">
            <img 
              src={selectedItem.imageUrl} 
              alt={selectedItem.title} 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out scale-100 group-hover:scale-102"
            />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-xs px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-text-primary border border-border rounded-xs">
              {selectedItem.location} — {selectedItem.dateString}
            </div>
          </div>

          {/* Contextual Archival Information Segment */}
          <div className="p-5 border-t border-border bg-surface-muted/30 shrink-0 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="font-body text-xs font-mono uppercase tracking-widest text-text-muted m-0">
                  // Selected Dossier Frame
                </p>
                <p className="font-body text-base font-bold text-text-primary uppercase tracking-wide m-0">
                  {selectedItem.title}
                </p>
              </div>

              {/* DEDICATED ARCHIVE LAUNCH TRIGGER BUTTON */}
              <Link 
                href={`/gallery/${selectedItem.exhibition.toLowerCase()}`}
                className="shrink-0 inline-flex items-center justify-center rounded-md bg-[#2e3a28] px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-white transition-all hover:bg-[#20291c] hover:shadow-xs"
              >
                Open Album &rarr;
              </Link>
            </div>

            <p className="font-body text-xs text-text-secondary leading-relaxed m-0">
              {selectedItem.caption}
            </p>
            
            {selectedItem.motion && (
              <div className="mt-2 p-3 bg-background border border-border rounded-md font-body">
                <span className="text-[9px] font-mono text-accent font-bold uppercase block tracking-wider mb-0.5">
                  Debated Motion Frame:
                </span>
                <p className="text-xs text-text-primary italic font-medium m-0 leading-normal">
                  "{selectedItem.motion}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT LAYER: The Scrollable Index Grid Tapestry (5 Columns) */}
        <div className="lg:col-span-5 h-full overflow-y-auto border border-border bg-surface-muted/10 rounded-xl p-3 custom-scrollbar">
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => {
              const isSelected = item.id === selectedItem.id;
              return (
                /* Swapped from Link back to button to handle state preview change safely */
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative text-left rounded-lg overflow-hidden border transition-all h-36 bg-surface flex flex-col justify-end cursor-pointer ${
                    isSelected 
                      ? "border-primary ring-2 ring-ring shadow-md" 
                      : "border-border hover:border-text-muted shadow-xs"
                  }`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-40 group-hover:opacity-50"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="relative p-2.5 z-10 w-full space-y-0.5">
                    <span className="block font-mono text-[8px] text-stone-200 tracking-wider uppercase">
                      {item.dateString}
                    </span>
                    <p className="font-body text-[11px] font-bold text-white uppercase tracking-wide line-clamp-1 m-0 leading-tight">
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}