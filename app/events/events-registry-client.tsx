"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import {
  Search,
  ArrowRight,
  Calendar,
  MapPin,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Award,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/bookmark-button";
import { NewsletterForm } from "@/components/newsletter-form";
import type { RegistryEventView } from "@/lib/view-models/events";

interface EventsRegistryClientProps {
  events: RegistryEventView[];
}

const ITEMS_PER_PAGE = 5;

export default function EventsRegistryClient({ events }: EventsRegistryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "HOST" | "CIRCUIT" | "ROUTINE"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRegistryLoading, setIsRegistryLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
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
  }, [events, searchQuery, activeFilter]);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const featuredEvent = useMemo(
    () => events.find((e) => e.isFeatured),
    [events],
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / ITEMS_PER_PAGE),
  );

  const months = useMemo(
    () => Array.from(new Set(events.map((e) => e.monthGroup))),
    [events],
  );

  const triggerShift = (action: () => void) => {
    setIsRegistryLoading(true);
    setTimeout(() => {
      action();
      setIsRegistryLoading(false);
    }, 200);
  };

  return (
    <div className="w-full flex flex-col gap-3 px-4 py-16 sm:px-8 lg:px-20 space-y-32 text-text-primary">
      {/* ─── ① ASYMMETRIC HERO BLOCK ────────────────────────────────────── */}
      <SectionReveal className="flex flex-col gap-4 w-full border-b border-[#2e3a28]/10 pb-12 items-baseline">
          <h1 className="font-garamond w-full text-4xl sm:text-5xl font-light tracking-wide text-primary">
            What's Happening at UNDS
          </h1>
                  <div className="md:col-span-8">
          <p className="max-w-2xl font-body text-base sm:text-lg leading-relaxed text-text-secondary">
            Stay up to date with trainings, hosted opens, tournaments, and
            society events happening across the University of Nigeria Debating
            Society.
          </p>
        </div>
      </SectionReveal>

      {/* ─── ② THE FEATURED SPOTLIGHT ──────────────────────────────────── */}
      {featuredEvent && (
        <>
          <div className="text-[10px] font-ui tracking-[0.25em] text-text-muted  mb-4 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary" /> // Current Spotlight
            Assembly
          </div>
          <div
            className="relative border  border-[#2e3a28] bg-surface/50 p-8 md:p-12 shadow-xs rounded-xs cursor-pointer overflow-hidden group transition-all duration-300 hover:shadow-md"
            onClick={() =>
              (window.location.href = `/events/${featuredEvent.id}`)
            }
          >
            <div className="absolute right-0 top-0 bg-[#2e3a28] text-[#fcfbf9] font-ui text-[9px]  tracking-widest px-4 py-1.5 rounded-bl-xs">
              Featured
            </div>
            <div className="max-w-3xl space-y-6 flex flex-col gap-3 items-start">
              <div className="space-y-1">
                <span className="font-ui text-xs text-primary font-bold tracking-wider">
                  {featuredEvent.dateString}
                </span>
                <h2 className="font-garamond text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
                  {featuredEvent.title}
                </h2>
              </div>
              <p className="font-garamond text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                {featuredEvent.description}
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs font-ui text-text-muted ">
                <span>{featuredEvent.location}</span>
                <span>•</span>
                <span>{featuredEvent.format}</span>
                <span>•</span>
                <span className="text-primary font-bold">
                  {featuredEvent.statusText}
                </span>
              </div>
              <Button className="font-manrope lg:w-50 capitalize font-medium sm:w-auto" aria-label="Register for Event">
                Register
              </Button>
            </div>
          </div>
          </>
      )}

      {/* ─── ③ SEARCH & FILTER DECK ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2e3a28]/5 pb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, venue, or format..."
              className="w-full rounded-xs border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)] px-4 py-2.5 pl-10 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] font-manrope placeholder:text-text-muted transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-text-muted" />
            </div>
          </div>

          <div className="flex flex-wrap gap-1 border border-[#2e3a28]/15 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  p-0.5 rounded-xs text-[10px] font-ui select-none">
            {[
              { id: "ALL", label: "All " },
              { id: "HOST", label: "Hosted Opens" },
              { id: "CIRCUIT", label: "Tournaments" },
              { id: "ROUTINE", label: "Weekly Loops" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  triggerShift(() => setActiveFilter(tab.id as any))
                }
                className={`px-3 py-2 rounded-xs transition-all  tracking-wider ${
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

        {/* ─── ④ UPCOMING ARCHIVE LIST ───────────────────────────────────── */}
        <div className="pt-8 relative space-y-8 min-h-87.5 w-full">
          {isRegistryLoading && (
            <div className="absolute inset-0 bg-surface/80 z-50 flex items-center justify-center backdrop-blur-xs">
              <span className="font-ui text-[10px]  tracking-widest text-primary animate-pulse">
                Synchronizing Ledger View...
              </span>
            </div>
          )}

          {paginatedEvents.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#2e3a28]/10 rounded-xs bg-[color-mix(in_srgb,var(--surface)_95%,black)]  w-full font-ui text-xs text-text-muted  tracking-wider">
              // No matching located in this cycle
            </div>
          ) : (
            <div className="space-y-8 w-full">
              {paginatedEvents.map((event) => (
                <motion.div
                  key={event.id}
                  onClick={() => (window.location.href = `/events/${event.id}`)}
                  className="group relative block w-full p-0.5 cursor-pointer"
                  whileHover="hover"
                  initial="rest"
                >
                  {/* Structural Sheaf Accent Stack */}
                  <div className="absolute inset-0 translate-x-1 translate-y-1 rotate-[0.3deg] border border-[#2e3a28]/10 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  rounded-xs transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />

                  {/* Foreground Sheet Plate */}
                  <motion.div
                    variants={{
                      rest: {
                        borderLeftWidth: "1px",
                      },
                      hover: {
                        borderLeftWidth: "4px",
                        borderLeftColor: "#2e3a28",
                      },
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative border border-[#2e3a28] bg-[color-mix(in_srgb,var(--surface)_95%,black)]  rounded-xs p-6 md:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full text-left"
                  >
                    {/* Left Frame: Clock & Framework Layout */}
                    <div className="md:col-span-3 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Calendar className="w-3.5 h-3.5 opacity-80" />
                        <span className="font-serif text-base font-black tracking-tight">
                          {event.dateString.split(" // ")[0]}
                        </span>
                      </div>
                      <div className="space-y-1 font-manrope text-[11px] text-text-secondary">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-text-muted" />
                          <span className=" tracking-wide font-bold">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-text-muted" />
                          <span className="tracking-wide text-[10px] border border-[#2e3a28]/10 bg-[#2e3a28]/5 px-1.5 py-px rounded-xs">
                            {event.format}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Frame: Conversational Content Stack */}
                    <div className="md:col-span-6 space-y-3">
                      <div className="space-y-1">
                        <span className="text-[9px] font-ui  tracking-widest text-primary font-bold block">
                          {event.type === "RECURRING_LOOP"
                            ? "✦ Routine Track"
                            : "🏆 Elite Circuit"}
                        </span>
                        <motion.h3
                          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                          className="font-garamond text-xl font-bold tracking-tight text-text-primary"
                        >
                          {event.title}
                        </motion.h3>
                      </div>
                      <p className="font-garamond text-sm text-text-secondary leading-relaxed tracking-wide">
                        {event.description}
                      </p>
                      <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-ui text-text-muted ">
                        <span className="text-primary font-bold">
                          ✓ {event.statusText}
                        </span>
                        <span>• {event.scopeText}</span>
                      </div>
                    </div>

                    {/* Right Frame: Explicitly Anchored CTA Signpost */}
                    <div className="md:col-span-3 h-full flex flex-col md:items-end justify-center pt-2 md:pt-0 space-y-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-ui  tracking-wider text-primary font-black">
                        Learn More
                        <motion.span
                          variants={{ rest: { x: 0 }, hover: { x: 3 } }}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.span>
                      </span>
                      <span className="text-[9px] font-ui text-text-muted hidden md:block tracking-tighter">
                        Schedule • Eligibility • Matrix
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Minimal Archive Page Control Rod */}
          {filteredEvents.length > ITEMS_PER_PAGE && (
            <div className="flex justify-end pt-4 w-full">
              <div className="flex items-stretch gap-1 font-ui text-[11px]">
                <button
                  onClick={() =>
                    triggerShift(() => setCurrentPage((p) => p - 1))
                  }
                  disabled={currentPage === 1 || isRegistryLoading}
                  className="p-2 rounded-xs border border-[#2e3a28]/30 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  disabled:opacity-20 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
                </button>
                <button
                  onClick={() =>
                    triggerShift(() => setCurrentPage((p) => p + 1))
                  }
                  disabled={currentPage === totalPages || isRegistryLoading}
                  className="p-2 rounded-xs border border-[#2e3a28]/30 bg-[color-mix(in_srgb,var(--surface)_95%,black)] disabled:opacity-20 cursor-pointer"
                >
                  <ChevronRight  className="w-3.5 h-3.5 text-foreground" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}
        </div>

      {/* ─── ⑤ CHRONOLOGICAL LEDGER VIEW ───────────────────────────────── */}
      <SectionReveal className="border-t border-[#2e3a28]/10 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 text-left">
          <h4 className="font-garamond text-2xl font-light  tracking-wide">
            Timeline{" "}
          </h4>
        </div>
        <div className="md:col-span-8 space-y-8">
          {months.map((month) => (
            <div
              key={month}
              className="border-b border-[#2e3a28]/5 pb-4 last:border-0"
            >
              <h4 className="font-ui text-xs font-bold text-primary  capitalize mb-4 tracking-wider">
                {month}
              </h4>
              <div className="space-y-3">
                {events.filter((e) => e.monthGroup === month).map(
                  (e) => (
                    <div
                      key={e.id}
                      className="flex justify-between items-baseline py-1.5 group cursor-pointer"
                      onClick={() => (window.location.href = `/events/${e.id}`)}
                    >
                      <span className="font-manrope text-xs text-text-secondary tracking-wide w-16 capitalize">
                        {e.dayString}
                      </span>
                      <span className="font-garamond text-base text-text-primary group-hover:text-primary group-hover:underline flex-1 transition-all">
                        {e.title}
                      </span>
                      <span className="font-ui text-[10px] text-text-muted ">
                        {e.format.split(" ")[0]}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* ─── ⑥ ORIENTATION LEAF ("NEW TO DEBATE?") ─────────────────────── */}
      <SectionReveal className="w-full">
        <div className="border border-[#2e3a28] bg-[color-mix(in_srgb,var(--surface)_70%,black)]  p-8 md:p-12 rounded-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <HelpCircle className="w-48 h-48 text-primary" />
          </div>
          <div className="md:col-span-8 space-y-4 text-left z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-ui  tracking-widest text-primary font-bold">
              <HelpCircle className="w-3.5 h-3.5" /> First time standing at the
              podium?
            </span>
            <h2 className="font-garamond text-3xl font-light text-text-primary">
              No prior case-building experience required.
            </h2>
            <p className="font-garamond text-base text-text-secondary leading-relaxed max-w-xl">
              More than half of our current senior national circuit
              representatives had never encountered a British Parliamentary
              timeline before entering our primary theater rooms. We train from
              first principles.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end justify-start z-10">
            <button
              onClick={() => (window.location.href = "/Ottawa WUDC Debating & Judging Manual.pdf")}
              className="px-6 py-3 border border-[#2e3a28] bg-text-primary text-text-inverse text-xs font-ui  tracking-wider font-bold transition-colors hover:bg-[#2e3a28] hover:text-[#fcfbf9]"
            >
              Read the Manual →
            </button>
          </div>
        </div>
      </SectionReveal>

      {/* ─── ⑦ PAST LAURELS ARCHIVE ────────────────────────────────────── */}
      <SectionReveal className="flex flex-col gap-2 border-t border-[#2e3a28]/10 pt-16 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div className="text-left">
            <h2 className="font-garamond text-2xl font-light tracking-wide">
              Past Highlights
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "PAUDC Deployment 2025",
              metric: "Grand Finalists",
              desc: "Secured structural knockout out-round positions in international divisions on the continental floor.",
            },
            {
              title: "National Forensics Open",
              metric: "Overall Champions",
              desc: "Swept team ranking indices and individual speaker logs across elite national brackets.",
            },
            {
              title: "Interfaculty League",
              metric: "Institutional Host",
              desc: "Coordinated internal tracking parameters across 14 campus delegations to foster debate depth.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  p-6 rounded-xs space-y-3"
            >
              <div className="flex items-center justify-between text-primary">
                <Award className="w-4 h-4 opacity-70" />
                <span className="font-ui text-[9px]  tracking-widest bg-[#2e3a28]/5 px-2 py-0.5 rounded-xs font-bold">
                  {item.metric}
                </span>
              </div>
              <h4 className="font-garamond text-lg font-bold text-text-primary">
                {item.title}
              </h4>
              <p className="font-garamond text-xs text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* ─── ⑧ STAY UPDATED DISPATCH ───────────────────────────────────── */}
      <SectionReveal className="border-t border-[#2e3a28]/10 pt-16 max-w-xl mx-auto text-center space-y-6">
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
  );
}
