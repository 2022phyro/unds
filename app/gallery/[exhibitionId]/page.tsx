"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { use } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";

interface AlbumPhoto {
  id: string;
  url: string;
  aspectRatio: "short" | "long"; // Controls structural layout positioning
  momentSummary: string;
  speakerCredit?: string;
}

// Simulated paginated relational database matching your exhibition ids
const ALBUM_DATABASE: Record<string, AlbumPhoto[]> = {
  "varsity_open_2025": [
    { id: "v1", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800", aspectRatio: "short", momentSummary: "Opening remarks by the Chief Adjudicator on baseline equity margins.", speakerCredit: "Gov. Speaker" },
    { id: "v2", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800", aspectRatio: "long", momentSummary: "Deep analytical focus during a tough cross-examination extension.", speakerCredit: "Opposition Leader" },
    { id: "v3", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800", aspectRatio: "short", momentSummary: "The tab room crunching team speaker tabs before the critical round 5 break announcements." },
    { id: "v4", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800", aspectRatio: "long", momentSummary: "Adjudication panel locked in closed deliberation over a tight 2-1 split decision." },
    { id: "v5", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800", aspectRatio: "short", momentSummary: "Celebrating the Grand Finals team breakdown declaration." }
  ]
};

interface AlbumPageProps {
  params: Promise<{ exhibitionId: string }>;
}

export default function GalleryAlbumDeepDive({ params }: AlbumPageProps) {
  const { exhibitionId } = use(params);
  
  // Lookup data safe fallback metrics
  const fullAlbumData = useMemo(() => {
    return ALBUM_DATABASE[exhibitionId] || ALBUM_DATABASE["varsity_open_2025"];
  }, [exhibitionId]);

  // Infinite Scroll Framework States
  const [visiblePhotos, setVisiblePhotos] = useState<AlbumPhoto[]>([]);
  const [displayLimit, setDisplayLimit] = useState(3);
  const [isLoaderSpinning, setIsLoaderSpinning] = useState(false);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  // Sync slice calculations
  useEffect(() => {
    setVisiblePhotos(fullAlbumData.slice(0, displayLimit));
  }, [displayLimit, fullAlbumData]);

  // Intersection Observer for Infinite Scroll loading
  useEffect(() => {
    const currentTrigger = loadingTriggerRef.current;
    if (!currentTrigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && displayLimit < fullAlbumData.length && !isLoaderSpinning) {
          setIsLoaderSpinning(true);
          
          // Smooth progressive loading injection block
          setTimeout(() => {
            setDisplayLimit((prev) => Math.min(prev + 2, fullAlbumData.length));
            setIsLoaderSpinning(false);
          }, 600);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(currentTrigger);
    return () => {
      if (currentTrigger) observer.unobserve(currentTrigger);
    };
  }, [displayLimit, fullAlbumData.length, isLoaderSpinning]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 flex flex-col h-[calc(100vh-var(--header-height,4.5rem))] overflow-hidden">
      
      {/* STICKY TOP COMPONENT BAR */}
      <div className="bg-background pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 border-b border-border/40">
        <div>
          <Link 
            href="/gallery" 
            className="text-[10px] font-mono tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1 mb-1"
          >
            &larr; Return to Exhibition Ledger
          </Link>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary uppercase sm:text-3xl">
            {exhibitionId.replace(/_/g, " ")}
          </h1>
        </div>
        
        <div className="font-mono text-[10px] text-text-muted bg-surface border border-border px-3 py-1.5 rounded-md shadow-xs">
          Index Log: <span className="text-text-primary font-bold">{visiblePhotos.length}</span> / {fullAlbumData.length} Frames
        </div>
      </div>

      {/* SCROLLABLE STAGGERED MASONRY CANVAS */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pt-6 pb-12">
        
        {/* CSS Multi-Column Masonry Wrapper */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 [column-fill:balance]">
          {visiblePhotos.map((photo) => (
            <SectionReveal 
              key={photo.id}
              className="break-inside-avoid relative rounded-xl overflow-hidden border border-border bg-surface group shadow-xs transition-all duration-300 hover:shadow-md hover:border-text-muted/40"
            >
              {/* Dynamic Image Canvas Box Proportion Frame */}
              <div className={`relative w-full overflow-hidden ${
                photo.aspectRatio === "long" ? "h-96" : "h-60"
              }`}>
                <img 
                  src={photo.url} 
                  alt={photo.momentSummary} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                
                {/* Responsive Content Overlay Layer
                    Mobile: Visible pinned bottom banner layout
                    Desktop (md:): Invisible by default, smoothly glides up on true mouse hover */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-12 text-white transition-all duration-300 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 flex flex-col justify-end">
                  
                  {photo.speakerCredit && (
                    <span className="font-mono text-[8px] tracking-widest text-accent uppercase font-bold mb-1 block">
                      // Monitor: {photo.speakerCredit}
                    </span>
                  )}
                  
                  <p className="font-body text-xs leading-relaxed tracking-wide text-stone-200 m-0 font-medium">
                    {photo.momentSummary}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* BOTTOM INFINITE SCROLL TARGET ANCHOR */}
        <div 
          ref={loadingTriggerRef} 
          className="w-full py-10 flex justify-center items-center shrink-0"
        >
          {isLoaderSpinning && (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="relative w-8 h-8 animate-spin [animation-duration:1.4s] flex flex-col justify-between items-center">
                <div className="w-5 h-3 border-2 border-primary bg-surface rounded-t-full border-b-0 relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 bg-accent h-full animate-pulse" />
                </div>
                <div className="w-5 h-3 border-2 border-primary bg-surface rounded-b-full border-t-0 relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 bg-accent h-0 animate-pulse" />
                </div>
              </div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-text-muted uppercase animate-pulse">
                Buffering History Matrix...
              </span>
            </div>
          )}
          
          {!isLoaderSpinning && displayLimit >= fullAlbumData.length && (
            <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest py-4">
              // End of Archival Record Registry Allocation
            </p>
          )}
        </div>

      </div>
    </div>
  );
}