"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";
import HourglassLoader from "@/components/ui/hourglass";
import NoteSheafCard from "@/components/ui/sheaf-cards";
import { Search, ArrowRight } from "lucide-react";

export interface AlbumMeta {
  id: string;
  category: "TOURNAMENTS" | "TRAININGS" | "SOCIALS" | "AWARDS";
  year: number;
  title: string;
  dateString: string;
  photoCount: number;
  location: string;
  imageUrl: string;
  subtitle: string;
  institutions?: string[];
}

interface GalleryRegistryClientProps {
  albums: AlbumMeta[];
}

export default function GalleryRegistryClient({ albums }: GalleryRegistryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"ALL" | "TOURNAMENTS" | "TRAININGS" | "SOCIALS" | "AWARDS">("ALL");
  const [activeYear, setActiveYear] = useState<"ALL" | 2026 | 2025>("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [activeCategory, activeYear, searchQuery]);

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            album.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "ALL" || album.category === activeCategory;
      const matchesYear = activeYear === "ALL" || album.year === activeYear;
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [albums, searchQuery, activeCategory, activeYear]);

  const stats = useMemo(() => {
    return {
      albums: albums.length,
      photos: albums.reduce((acc, curr) => acc + curr.photoCount, 0),
      years: new Set(albums.map((album) => album.year)).size,
    };
  }, [albums]);

  const featuredAlbum = albums[0];

  return (
    <div className="w-full  text-text-primary min-h-screen font-manrope">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">

        {/* ─── ARCHIVE EDITORIAL HEADER ───────────────────────────────── */}
        <SectionReveal className="border-b border-[#2e3a28]/10 pb-8 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono  tracking-[0.25em] text-text-muted block">
              Visual Archive
            </span>
            <h1 className="font-garamond text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
              Our Story in Pictures
            </h1>
            <p className="font-garamond text-base text-text-secondary max-w-xl leading-relaxed">
              The tournaments, the breakout calculations, the late-night prep rooms, and the historic victories that shape who we are.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md pt-4 font-mono text-[11px] text-text-secondary">
            <div className="border-l border-[#2e3a28]/20 pl-3">
              <span className="block text-text-muted text-[9px]  tracking-wider">Collections</span>
              <span className="font-bold text-primarytext-sm">{stats.albums} Albums</span>
            </div>
            <div className="border-l border-[#2e3a28]/20 pl-3">
              <span className="block text-text-muted text-[9px]  tracking-wider">Frames</span>
              <span className="font-bold text-primarytext-sm">{stats.photos} Photos</span>
            </div>
            <div className="border-l border-[#2e3a28]/20 pl-3">
              <span className="block text-text-muted text-[9px]  tracking-wider">Chronology</span>
              <span className="font-bold text-primarytext-sm">{stats.years} Years Active</span>
            </div>
          </div>
        </SectionReveal>

        {/* ─── FEATURED HERO ALBUM FRAME ───────────────────────────────── */}
        {featuredAlbum && (
          <SectionReveal>
            <NoteSheafCard>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-7 relative h-64 sm:h-80 bg-stone-900 rounded-xs overflow-hidden">
                  <img
                    src={featuredAlbum.imageUrl}
                    alt={featuredAlbum.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-4 left-4 bg-[#2e3a28] text-white px-2.5 py-1 font-mono text-[9px]  tracking-widest rounded-xs">
                    Featured Album
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-between py-2 text-left">
                  <div className="space-y-3">
                    <div className="flex gap-2 font-mono text-[9px] text-text-muted  tracking-wider">
                      <span>{featuredAlbum.location}</span>
                      <span>•</span>
                      <span>{featuredAlbum.dateString}</span>
                    </div>
                    <h2 className="font-garamond font-bold tracking-tight text-text-primary">
                      {featuredAlbum.title}
                    </h2>
                    <p className="font-manrope text-sm text-text-secondary leading-relaxed">
                      {featuredAlbum.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2e3a28]/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-text-muted">
                      {featuredAlbum.photoCount} Photographs Recorded
                    </span>
                    <Link
                      href={`/gallery/${featuredAlbum.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold  tracking-widest text-primaryhover:text-black transition-colors group"
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </NoteSheafCard>
          </SectionReveal>
        )}

        {/* ─── CONTROLS: SEARCH & CHRONOLOGICAL FILTERS ─────────────────── */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-y border-[#2e3a28]/10 py-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search moments, locations, or key motions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[color-mix(in_srgb,var(--surface)_95%,black)]  border pl-9 pr-4 py-2 text-xs rounded-xs font-manrope text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-[color-mix(in_srgb,var(--surface)_95%,black)]  border border-[#2e3a28]/10 p-0.5 text-[10px] font-mono rounded-xs">
              {(["ALL", "TOURNAMENTS", "TRAININGS", "SOCIALS"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 transition-all cursor-pointer ${activeCategory === cat ? "bg-[#2e3a28] text-white font-bold" : "text-text-muted hover:text-text-primary"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex bg-[color-mix(in_srgb,var(--surface)_95%,black)]  border border-[#2e3a28]/10 p-0.5 text-[10px] font-mono rounded-xs">
              {(["ALL", 2026, 2025] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setActiveYear(yr)}
                  className={`px-3 py-1.5 transition-all cursor-pointer ${activeYear === yr ? "bg-[#2e3a28] text-white font-bold" : "text-text-muted hover:text-text-primary"}`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── DYNAMIC CONTENT GRID / BOOKSHELF CHANNELS ────────────────── */}
        {isLoading ? (
          <div className="w-full py-20 flex justify-center items-center">
            <HourglassLoader size={90} />
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="w-full py-16 text-center font-mono text-xs text-text-muted border border-dashed border-[#2e3a28]/10">
            No archival records matched the request.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 text-left">
            {filteredAlbums.map((album) => (
              <Link
                href={`/gallery/${album.id}`}
                key={album.id}
                className="block group"
              >
                <NoteSheafCard>
                  <div className="flex flex-col gap-3 justify-between">
                    <div className="space-y-4">
                      {/* Album Snapshot */}
                      <div className="relative h-40 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  rounded-xs overflow-hidden shrink-0">
                        <img
                          src={album.imageUrl || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600"}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="absolute bottom-2 left-2 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  backdrop-blur-xs px-2 py-0.5 font-mono text-[8px] text-text-primary tracking-widest  border border-[#2e3a28]/10 rounded-xs">
                          {album.location}
                        </div>
                      </div>

                      {/* Editorial Metadata */}
                      <div className="space-y-1 flex flex-col gap-2 ">
                        <span className="block font-mono text-[9px] text-text-muted tracking-wider ">
                          {album.dateString} // {album.category}
                        </span>
                        <h3 className="font-garamond text-lg! font-bold text-text-primary tracking-tight leading-tight group-hover:text-primarytransition-colors ">
                          {album.title}
                        </h3>
                        <p className="font-manrope text-xs text-text-secondary line-clamp-2 leading-relaxed">
                          {album.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {album.institutions && album.institutions.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {album.institutions.map((inst, index) => (
                            <span key={index} className="bg-[color-mix(in_srgb,var(--surface)_95%,black)]  text-text-muted font-mono text-[8px] px-1.5 py-0.5 border border-[#2e3a28]/10 rounded-xs">
                              {inst}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 border-t border-[#2e3a28]/5 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-text-muted">{album.photoCount} Photographs</span>
                        <span className="text-primaryfont-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Open Document &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </NoteSheafCard>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
