"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { AlbumPhoto } from "@/lib/cloudinary";

interface AlbumLightboxClientProps {
  photos: AlbumPhoto[];
  title: string;
  location: string;
}

export default function AlbumLightboxClient({ photos, title, location }: AlbumLightboxClientProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActivePhotoIndex(index);
  const closeLightbox = () => setActivePhotoIndex(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (activePhotoIndex === null) return;
    if (direction === "prev") {
      setActivePhotoIndex((prev) => (prev! === 0 ? photos.length - 1 : prev! - 1));
    } else {
      setActivePhotoIndex((prev) => (prev! === photos.length - 1 ? 0 : prev! + 1));
    }
  };

  if (photos.length === 0) {
    return (
      <SectionReveal className="space-y-4 pt-4 border-t border-[#2e3a28]/10">
        <p className="font-garamond text-sm text-text-secondary">
          No photographs have been catalogued for this album yet.
        </p>
      </SectionReveal>
    );
  }

  return (
    <>
      <SectionReveal className="space-y-4 pt-4 border-t border-[#2e3a28]/10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid bg-[color-mix(in_srgb,var(--surface)_95%,black)]  border border-[#2e3a28]/10 hover:border-[#2e3a28] rounded-xs p-2 shadow-3xs transition-all cursor-zoom-in group"
            >
              <div className="relative overflow-hidden bg-[color-mix(in_srgb,var(--surface)_95%,black)] ">
                <img
                  src={photo.url}
                  alt={photo.speaker}
                  className="w-full h-auto object-cover opacity-95 transition-transform duration-500 group-hover:scale-101"
                />
              </div>
              <div className="pt-2 px-1 text-left space-y-0.5">
                <span className="font-mono text-[8px] font-ui tracking-wider text-[#2e3a28] block">
                  {photo.speaker}
                </span>
                <p className="font-garamond text-xs text-text-secondary leading-tight m-0">
                  {photo.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {activePhotoIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-xs select-none">
          <div className="w-full flex justify-between items-center text-white shrink-0">
            <span className="font-mono text-[10px] tracking-widest text-stone-400">
              FRAME INDEX REGISTER // {activePhotoIndex + 1} OF {photos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 border border-white/10 hover:border-white transition-colors rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-between w-full max-w-5xl mx-auto gap-4 my-2">
            <button
              onClick={() => navigateLightbox("prev")}
              className="text-white border border-white/10 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0 hidden sm:block"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] sm:max-h-[70vh] max-w-full flex items-center justify-center">
              <img
                src={photos[activePhotoIndex].url}
                alt="Active Frame Inspect"
                className="max-h-full max-w-full object-contain shadow-xl border border-white/5"
              />
            </div>

            <button
              onClick={() => navigateLightbox("next")}
              className="text-white border border-white/10 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0 hidden sm:block"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full max-w-2xl mx-auto bg-stone-900 border border-white/10 p-5 text-left text-white rounded-xs shadow-2xl mb-2">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[#9fc293] font-black font-ui tracking-widest block">
                Logged Subject: {photos[activePhotoIndex].speaker}
              </span>
              <p className="font-garamond text-sm sm:text-base text-stone-200 leading-normal m-0">
                {photos[activePhotoIndex].context}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] text-stone-400">
              <div>
                <span className="font-ui text-stone-500">// Event Horizon:</span> {title}
              </div>
              <div>
                <span className="font-ui text-stone-500">// Location Anchor:</span> {location}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
