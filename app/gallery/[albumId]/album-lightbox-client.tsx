"use client";

import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { AlbumPhoto } from "@/lib/cloudinary";
import { CloudinaryImage } from "@/components/cl-image";

interface AlbumLightboxClientProps {
  photos: AlbumPhoto[];
  title: string;
  location: string;
}

const ITEMS_PER_PAGE = 15; // Set to a multiple of 3 for mosaic balance

export default function AlbumLightboxClient({
  photos,
  title,
  location,
}: AlbumLightboxClientProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination boundaries
  const totalPages = Math.ceil(photos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPhotos = photos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openLightbox = (indexInPaginatedList: number) => {
    setActivePhotoIndex(startIndex + indexInPaginatedList);
  };

  const closeLightbox = () => setActivePhotoIndex(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (activePhotoIndex === null) return;
    if (direction === "prev") {
      setActivePhotoIndex((prev) =>
        prev! === 0 ? photos.length - 1 : prev! - 1,
      );
    } else {
      setActivePhotoIndex((prev) =>
        prev! === photos.length - 1 ? 0 : prev! + 1,
      );
    }
  };
  if (photos.length === 0) {
    return (
      <p className="font-garamond text-sm text-text-secondary">
        No photographs have been catalogued for this album yet.
      </p>
    );
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };

    if (activePhotoIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex]);

  return (
    <>
      {/* Responsive Mosaic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 auto-rows-40 sm:auto-rows-50 grid-flow-row-dense">
        {paginatedPhotos.map((photo, index) => {
          // Calculate pseudo-random spanning classes based on index to form a beautiful, repeatable mosaic
          const isWide = index % 4 === 0;
          const isTall = index % 3 === 0 && index % 4 !== 0;
          const isFeatured = index % 7 === 0;

          let gridSpanClass = "col-span-1 row-span-1";
          if (isFeatured) {
            gridSpanClass = "col-span-1 sm:col-span-2 row-span-2"; // Dominant focus frame
          } else if (isWide) {
            gridSpanClass = "col-span-1 sm:col-span-2 row-span-1"; // Landscape stretch
          } else if (isTall) {
            gridSpanClass = "col-span-1 row-span-2"; // Portrait vertical
          }

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className={`${gridSpanClass} relative group overflow-hidden bg-[color-mix(in_srgb,var(--surface)_95%,black)] border border-[#2e3a28]/15 hover:border-[#2e3a28] rounded-xs shadow-3xs transition-all duration-300 cursor-zoom-in`}
            >
              {/* Image element configured with automatic layout containment */}
              <CloudinaryImage
                src={photo.url}
                alt={photo.speaker || "Event Photograph"}
                loading="lazy"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-103 group-hover:opacity-100"
              />

              {/* Modern Hover Overlay containing speaker & custom captions */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end text-left">
                {photo.speaker && (
                  <span className="font-mono text-[8px] tracking-wider text-primary font-bold uppercase mb-1">
                    {photo.speaker}
                  </span>
                )}
                {photo.context && (
                  <p className="font-garamond text-xs text-stone-200 line-clamp-2 leading-tight">
                    {photo.context}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4 font-mono text-xs select-none">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-[#2e3a28]/10 rounded-xs hover:bg-[#2e3a28]/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
          >
            Previous
          </button>
          <span className="text-text-secondary">
            PAGE {currentPage} OF {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-[#2e3a28]/10 rounded-xs hover:bg-[#2e3a28]/5 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Full-Screen Immersive Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 bg-black/98 z-50 flex flex-col p-4 md:p-8 backdrop-blur-md select-none animate-fade-in">
          {/* Header Dashboard */}
          <div className="w-full flex justify-between items-center text-white shrink-0 mb-4">
            <span className="font-mono text-[9px] tracking-widest text-stone-400">
              FRAME INDEX REGISTER // {activePhotoIndex + 1} OF {photos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 border border-white/10 hover:border-white transition-colors rounded-full cursor-pointer hover:bg-white/5"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Fix: Centered Workspace & Always-Visible Controls */}
          <div className="flex-1 flex items-center justify-center w-full max-w-7xl mx-auto gap-2 md:gap-4 relative">
            {/* Prev Button: Removed 'hidden sm:block' */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="text-white border border-white/10 p-2 md:p-3 rounded-full hover:bg-white/10 transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Display container: flex + items-center ensures absolute centering */}
            {/* Lightbox responsive display container */}
{/* Lightbox container */}
<div className="relative flex-1 w-full h-[80vh] flex items-center justify-center overflow-hidden">
  <CloudinaryImage
    src={photos[activePhotoIndex].fullSizeUrl}
    alt="Active Frame"
    className="w-full h-full object-contain" // 'object-contain' is the key to no warping
  />
</div>

            {/* Next Button: Removed 'hidden sm:block' */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="text-white border border-white/10 p-2 md:p-3 rounded-full hover:bg-white/10 transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Metadata Footer */}
          <div className="w-full max-w-3xl mx-auto bg-stone-950/80 border border-white/10 p-4 mt-4 text-white rounded-xs backdrop-blur-md">
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9px] text-stone-400">
              <div>{title}</div>
              <div>{location}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
