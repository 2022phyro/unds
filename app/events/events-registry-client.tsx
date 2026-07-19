"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";
import {
  Search,
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Award,
  Mail,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/bookmark-button";
import { NewsletterForm } from "@/components/newsletter-form";
import type { RegistryEventView } from "@/lib/view-models/events";

interface EventsRegistryClientProps {
  events: RegistryEventView[];
}

const ITEMS_PER_PAGE = 5;

const FILTERS = [
  { id: "ALL", label: "All" },
  { id: "HOST", label: "Hosted Opens" },
  { id: "CIRCUIT", label: "Tournaments" },
  { id: "ROUTINE", label: "Weekly Loops" },
] as const;

function parseDateBadge(dateString: string) {
  const [main] = dateString.split(" // ");
  const parts = main.trim().split(" ");
  const day = parts.pop() ?? "";
  const month = parts.join(" ");
  return { month, day };
}

function sortEvents(list: RegistryEventView[]) {
  return list;
}

export default function EventsRegistryClient({ events }: EventsRegistryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]["id"]>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRegistryLoading, setIsRegistryLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const filteredEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const matchesFilter =
        activeFilter === "ALL" ||
        (activeFilter === "HOST" && event.type === "INTERNAL_HOST") ||
        (activeFilter === "CIRCUIT" && event.type === "EXTERNAL_MAJOR") ||
        (activeFilter === "ROUTINE" && event.type === "RECURRING_LOOP");

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
    return sortEvents(filtered);
  }, [events, searchQuery, activeFilter]);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const featuredEvent = useMemo(() => events.find((e) => e.isFeatured), [events]);
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));

  const triggerShift = (action: () => void) => {
    setIsRegistryLoading(true);
    setTimeout(() => {
      action();
      setIsRegistryLoading(false);
    }, 200);
  };

  const eyebrowFor = (type: RegistryEventView["type"]) =>
    type === "RECURRING_LOOP"
      ? "Routine Track"
      : type === "INTERNAL_HOST"
        ? "Hosted Open"
        : "Elite Circuit";

  return (
    <div className="w-full flex flex-col gap-3 text-text-primary">
      <div className="px-4 sm:px-8 lg:px-20 pt-16 space-y-32">
        <h1 className="relative font-garamond w-full text-3xl! sm:text-4xl! md:text-5xl! font-light tracking-wide text-text-primary">
          Trending
        </h1>
      </div>

      <div className="px-4 sm:px-8 lg:px-20 space-y-32 flex flex-col gap-8">
        {/* ─── FEATURED EVENT ───────────────────────────────────────── */}
        {featuredEvent && (
          <div className="relative">
            {/* The whole card is a real Link now — gets hover/viewport
                prefetching for free, and there's no separate onClick div
                for a nested button's click to conflict with. */}
            <Link
              href={`/events/${featuredEvent.id}`}
              className="block relative border border-[#2e3a28] bg-surface/50 shadow-xs rounded-xs overflow-hidden group transition-all duration-300 hover:shadow-md"
            >
              <div className="absolute right-0 top-0 bg-[#2e3a28] text-[#fcfbf9] font-ui text-[9px] tracking-widest px-4 py-1.5 rounded-bl-xs z-10">
                Featured
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 md:p-8 items-center">
                <div className="flex md:flex-col items-baseline md:items-start gap-2 md:gap-0 md:border-l-2 border-primary md:pl-4">
                  {(() => {
                    const { month, day } = parseDateBadge(featuredEvent.dateString);
                    return (
                      <span className="font-garamond text-3xl md:text-4xl leading-none text-text-primary">
                        <span className="block text-xs font-ui font-bold tracking-widest text-primary mb-1">
                          {month}
                        </span>
                        {day}
                      </span>
                    );
                  })()}
                </div>

                <div className="space-y-3 min-w-0">
                  <span className="inline-flex items-center gap-1.5 font-ui text-xs text-primary font-bold tracking-wider">
                    <Trophy className="w-3.5 h-3.5" /> {eyebrowFor(featuredEvent.type)}
                  </span>
                  <h2 className="font-garamond text-2xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
                    {featuredEvent.title}
                  </h2>
                  <p className="font-garamond text-sm md:text-lg text-text-secondary leading-relaxed max-w-2xl">
                    {featuredEvent.description}
                  </p>
                  <div className="text-xs font-ui text-text-muted flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {featuredEvent.location}
                    </span>
                    <span>• {featuredEvent.format}</span>
                    <span className="text-primary font-bold">• {featuredEvent.statusText}</span>
                  </div>
                </div>

                <div className="md:self-center">
                  {/* stopPropagation isn't actually needed anymore since
                      there's no separate onClick on an ancestor — but kept
                      as a safety net in case this Button internally renders
                      its own <a>/<Link>, so a click resolves to exactly one
                      navigation target instead of two nested ones firing. */}
                  <span onClick={(e) => e.stopPropagation()} className="inline-block">
                    <Button
                      className="font-manrope w-full md:w-auto capitalize font-medium"
                      aria-label="Register for Event"
                    >
                      {featuredEvent.status === "REGISTRATION_OPEN" ? "Register Now" : "View Details"}
                    </Button>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ─── CHRONOLOGICAL EVENTS LIST ── */}
        <div className="relative flex flex-col gap-3 pt-10 min-h-87.5 w-full">
          <div className="flex items-baseline gap-3 justify-between">
            <h3 className="font-garamond text-2xl font-light tracking-wide">Upcoming Events</h3>
          </div>

          <div className="border-b border-[#2e3a28]/10 bg-[color-mix(in_srgb,var(--surface)_95%,black)] backdrop-blur-md">
            <div className="px-4 sm:px-8 lg:px-20 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative flex-1 min-w-0 sm:max-w-xs">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, topics, or venues..."
                  className="w-full rounded-xs border border-[#2e3a28]/20 bg-surface px-4 py-2.5 pl-10 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] font-manrope placeholder:text-text-muted transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-text-muted" />
                </div>
              </div>

              <div className="flex gap-1 overflow-x-auto scrollbar-hide border border-[#2e3a28]/15 bg-surface p-0.5 rounded-xs text-[10px] font-ui select-none shrink-0">
                {FILTERS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => triggerShift(() => setActiveFilter(tab.id))}
                    className={`shrink-0 px-3 py-2 rounded-xs transition-all tracking-wider whitespace-nowrap ${
                      activeFilter === tab.id
                        ? "bg-[#2e3a28] text-[#fcfbf9] font-bold"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isRegistryLoading && (
            <div className="absolute inset-0 bg-surface/80 z-50 flex items-center justify-center backdrop-blur-xs">
              <span className="font-ui text-[10px] tracking-widest text-primary animate-pulse">
                Synchronizing Ledger View...
              </span>
            </div>
          )}

          {paginatedEvents.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#2e3a28]/10 rounded-xs bg-[color-mix(in_srgb,var(--surface)_95%,black)] w-full font-ui text-xs text-text-muted tracking-wider">
              // No matches located in this cycle
            </div>
          ) : (
            <div className="divide-y divide-[#2e3a28]/10 border flex flex-col border-[#2e3a28]/15 rounded-xs bg-[color-mix(in_srgb,var(--surface)_95%,black)] overflow-hidden">
              {paginatedEvents.map((event) => {
                const { month, day } = parseDateBadge(event.dateString);
                return (
                  <Link
                    href={`/events/${event.id}`}
                    key={event.id}
                    className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-5 transition-colors hover:bg-[#2e3a28]/[0.03]"
                  >
                    <div className="flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0 sm:w-16 shrink-0">
                      <span className="text-[10px] font-ui font-bold tracking-widest text-primary uppercase">
                        {month}
                      </span>
                      <span className="font-serif text-xl w-full sm:text-2xl capitalize font-black leading-none text-ellipsis overflow-hidden text-text-primary">
                        {day}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[9px] font-ui font-bold tracking-widest text-primary uppercase">
                          {eyebrowFor(event.type)}
                        </span>
                        <span className="text-[10px] font-ui text-text-muted border border-[#2e3a28]/10 bg-[#2e3a28]/5 px-1.5 py-px rounded-xs">
                          {event.statusText}
                        </span>
                      </div>
                      <h4 className="font-garamond text-lg font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-manrope text-text-secondary">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-text-muted" />
                          {event.location}
                        </span>
                        <span>• {event.format}</span>
                      </div>
                    </div>

                    <ArrowRight className="hidden sm:block w-4 h-4 text-text-muted shrink-0 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>
          )}

          {filteredEvents.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between pt-2 w-full">
              <span className="font-ui text-[10px] tracking-wider text-text-muted">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-stretch gap-1 font-ui text-[11px]">
                <button
                  onClick={() => triggerShift(() => setCurrentPage((p) => p - 1))}
                  disabled={currentPage === 1 || isRegistryLoading}
                  className="p-2 rounded-xs border border-[#2e3a28]/30 bg-[color-mix(in_srgb,var(--surface)_95%,black)] disabled:opacity-20 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
                </button>
                <button
                  onClick={() => triggerShift(() => setCurrentPage((p) => p + 1))}
                  disabled={currentPage === totalPages || isRegistryLoading}
                  className="p-2 rounded-xs border border-[#2e3a28]/30 bg-[color-mix(in_srgb,var(--surface)_95%,black)] disabled:opacity-20 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── ORIENTATION LEAF ─────────────────────────────────────── */}
        <SectionReveal className="w-full">
          <div className="border border-[#2e3a28] bg-[color-mix(in_srgb,var(--surface)_70%,black)] p-6 sm:p-8 md:p-12 rounded-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <HelpCircle className="w-48 h-48 text-primary" />
            </div>
            <div className="md:col-span-8 space-y-4 text-left z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-ui tracking-widest text-primary font-bold">
                <HelpCircle className="w-3.5 h-3.5" /> First time standing at the podium?
              </span>
              <h2 className="font-garamond text-2xl sm:text-3xl font-light text-text-primary">
                No prior case-building experience required.
              </h2>
              <p className="font-garamond text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
                More than half of our current senior national circuit
                representatives had never encountered a British Parliamentary
                timeline before entering our primary theater rooms. We train
                from first principles.
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end justify-start z-10">
              {/* Static file → plain anchor, not router.push. Using the
                  client router for a non-route asset like a PDF is the
                  wrong tool and forces an unnecessary client-side
                  navigation attempt against something that isn't a page. */}
              <a
                href="/WUDC Debating & Judging Manual.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#2e3a28] btn-primary text-xs font-ui tracking-wider font-bold transition-colors hover:bg-[#2e3a28] hover:text-[#fcfbf9]"
              >
                Read the Manual →
              </a>
            </div>
          </div>
        </SectionReveal>

        {/* ─── PAST LAURELS ARCHIVE ─────────────────────────────────── */}
        <SectionReveal className="flex flex-col gap-2 border-t border-[#2e3a28]/10 pt-16 space-y-8">
          <h2 className="font-garamond text-2xl font-light tracking-wide text-left">Past Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "ANUDC 2023", metric: "Overall Champions", desc: "Swept away the competition in both open and novice streams." },
              { title: "ANUDC 2025", metric: "Novice Runners-Up", desc: "100% breaks into the outrounds, presented award-winning adjudicators, and novice runnerups" },
              { title: "Meet The Spartans 2.0", metric: "Internals", desc: "Organized and hosted the largest internal debate tournament in the society's history yet, with 40+ participants." },
            ].map((item, idx) => (
              <div key={idx} className="border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)] p-6 rounded-xs space-y-3">
                <div className="flex items-center justify-between text-primary">
                  <Award className="w-4 h-4 opacity-70" />
                  <span className="font-ui text-[9px] tracking-widest bg-[#2e3a28]/5 px-2 py-0.5 rounded-xs font-bold">
                    {item.metric}
                  </span>
                </div>
                <h4 className="font-garamond text-lg font-bold text-text-primary">{item.title}</h4>
                <p className="font-garamond text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* ─── STAY UPDATED DISPATCH ────────────────────────────────── */}
        <SectionReveal className="border-t border-[#2e3a28]/10 pt-16 pb-16 max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-[#2e3a28]/5 text-primary">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-garamond text-2xl font-light tracking-tight text-text-primary">
              Never miss an opening.
            </h3>
            <p className="font-garamond text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
              Receive precise institutional briefings regarding tournament
              registry schedules, workshop lists, and public round alerts.
            </p>
          </div>
          <NewsletterForm source="events" className="max-w-md mx-auto" />
        </SectionReveal>
      </div>
    </div>
  );
}