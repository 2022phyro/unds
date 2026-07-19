"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { CloudinaryImage } from "@/components/cl-image";

export interface AlbumMeta {
  id: string;
  category: "TOURNAMENTS" | "TRAININGS" | "SOCIALS" | "AWARDS";
  year: number;
  title: string;
  dateString: string;
  photoCount: number;
  imageUrl: string;
  subtitle: string;
  institutions?: string[];
}

interface GalleryRegistryClientProps {
  albums: AlbumMeta[];
}

const CATEGORIES = [
  "ALL",
  "TOURNAMENTS",
  "TRAININGS",
  "SOCIALS",
  "AWARDS",
] as const;

const YEARS = ["ALL", 2026, 2025, 2024, 2023] as const;

export default function GalleryRegistryClient({
  albums,
}: GalleryRegistryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("ALL");
  const [activeYear, setActiveYear] = useState<(typeof YEARS)[number]>("ALL");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Performance: Deferred value keeps search snappy while typing
  const deferredQuery = useDeferredValue(searchQuery);

  // Usability: Calculate active filters for UI badges
  const activeFilterCount =
    (activeCategory !== "ALL" ? 1 : 0) + (activeYear !== "ALL" ? 1 : 0);

  const filteredAlbums = useMemo(() => {
    const query = deferredQuery.toLowerCase();
    const filtered = albums.filter((album) => {
      const matchesSearch =
        album.title.toLowerCase().includes(query) ||
        album.subtitle.toLowerCase().includes(query);
      const matchesCategory =
        activeCategory === "ALL" || album.category === activeCategory;
      const matchesYear = activeYear === "ALL" || album.year === activeYear;
      return matchesSearch && matchesCategory && matchesYear;
    });
    return [...filtered].sort((a, b) =>
      sortOrder === "newest" ? b.year - a.year : a.year - b.year,
    );
  }, [albums, deferredQuery, activeCategory, activeYear, sortOrder]);

  const featuredAlbum = albums[0];

  return (
    <div className="w-full min-h-screen bg-surface text-text-primary transition-colors">
      <div className="mx-auto px-3 sm:px-6 md:px-12 py-8 sm:py-12">
        {/* ─── FEATURED HERO ──────────────────────────────────────────── */}
        {featuredAlbum && (
          <Link
            href={`/gallery/${featuredAlbum.id}`}
            className="group relative block mb-8 sm:mb-12 h-85 sm:h-[420px] md:h-[480px] overflow-hidden rounded-xl sm:rounded-2xl border border-text-primary/10"
          >
            <CloudinaryImage
              src={featuredAlbum.imageUrl}
              alt={featuredAlbum.title}
              priority={true} // Optimized for LCP
              width={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10 text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 mb-3 block">
                Featured Album
              </span>
              <h2 className="font-serif font-bold leading-[1.05] text-3xl sm:text-4xl md:text-5xl mb-2 text-white!">
                {featuredAlbum.title}
              </h2>
              <p className="font-serif italic text-white/80! text-sm sm:text-base mb-4 sm:mb-6">
                {featuredAlbum.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="text-[11px] uppercase tracking-wider text-white/60">
                  {featuredAlbum.photoCount} Photographs ·{" "}
                  {featuredAlbum.dateString}
                </span>
                <span className="inline-flex items-center gap-2 text-black rounded-sm bg-white px-4 py-2">
                  Explore Album
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ─── SEARCH + FILTERS ──────────────────────────────────────── */}
        <section className="sticky top-0 z-30 mb-10 sm:mb-16 border-b border-text-primary/10 bg-surface/95 backdrop-blur-md pb-6 flex flex-col gap-2 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-1/3">
              <label
                htmlFor="search"
                className="text-[9px] uppercase tracking-[0.2em] text-text-muted mb-2 block"
              >
                Search Archive
              </label>
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="search"
                  type="text"
                  placeholder="Moments, locations, motions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-lg font-serif border-b border-text-primary/20 pb-1 pl-6 focus:outline-none focus:border-text-primary transition-colors"
                />
              </div>
            </div>

            {/* Filters Toggle Mobile */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="filter-panel"
              className="sm:hidden inline-flex items-center justify-between gap-2 rounded-full border border-text-primary/15 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-surface text-[9px] text-text-primary">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Desktop Filters */}
            <div className="hidden sm:flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-sm px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                      activeCategory === cat
                        ? "bg-text-primary text-surface"
                        : "border border-text-primary/15 text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {YEARS.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setActiveYear(yr)}
                      className={`rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                        activeYear === yr
                          ? "bg-text-primary text-surface"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as "newest" | "oldest")
                  }
                  className="bg-transparent text-[10px] uppercase tracking-wider text-text-secondary border-none focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Collapsible Panel */}
          {filtersOpen && (
            <div
              id="filter-panel"
              className="sm:hidden mt-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 mt-1 overflow-x-auto pb-1 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 rounded-sm px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${
                      activeCategory === cat
                        ? "bg-text-primary text-surface"
                        : "border border-text-primary/15 text-text-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {YEARS.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setActiveYear(yr)}
                    className={`shrink-0 rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                      activeYear === yr
                        ? "bg-text-primary text-surface"
                        : "border border-text-primary/15 text-text-secondary"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="w-fit bg-transparent text-[10px] uppercase tracking-wider text-text-secondary border border-text-primary/15 rounded-full px-3 py-1.5 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          )}
        </section>

        {/* ─── ALBUM GRID ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6">
          {filteredAlbums.map((album) => (
            <Link
              href={`/gallery/${album.id}`}
              key={album.id}
              className="group block relative bg-surface-secondary border border-text-primary/5 rounded-sm overflow-hidden hover:border-text-primary/20 transition-all"
            >
              <div className="aspect-16/10 overflow-hidden">
                <CloudinaryImage
                  src={album.imageUrl}
                  alt={album.title}
                  width={800}
                  priority={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-[9px] uppercase tracking-widest text-primary font-bold mb-2 block">
                  {album.category}
                </span>
                <h3 className="text-[24px]! font-serif font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
                  {album.title}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                  {album.subtitle}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-text-primary/10">
                  <span className="text-[10px] uppercase tracking-wider text-text-muted">
                    {album.photoCount} Photos · {album.dateString}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-text-primary/15 transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredAlbums.length === 0 && (
          <div className="py-24 text-center text-sm text-text-muted">
            No albums match your current filters.
          </div>
        )}
      </div>
    </div>
  );
}