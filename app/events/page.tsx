"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/bookmark-button";
import { UNDSEvent } from "@/types/events";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Complete dataset conforming to the database model
const REGISTRY_DATA: UNDSEvent[] = [
  {
    id: "varsity-open-2026",
    type: "INTERNAL_HOST",
    status: "REGISTRATION_OPEN",
    title: "The Varsity Forensics Open",
    dateString: "OCT 22-25, 2026",
    sortDate: "2026-10-22",
    location: "UNN CAMPUS",
    format: "BRITISH PARLIAMENTARY",
    description: "Our premier annual inter-collegiate collision. Bringing together top-tier institutions across West African circuits to battle through 6 preliminary rounds.",
    registrationUrl: "/events/varsity-open-2026/register"
  },
  {
    id: "paudc-2026",
    type: "EXTERNAL_MAJOR",
    status: "REGISTRATION_OPEN",
    title: "Pan-African Universities Debating Championship",
    dateString: "DEC 05-13, 2026",
    sortDate: "2026-12-05",
    location: "ACCRA, GHANA",
    format: "BRITISH PARLIAMENTARY",
    description: "The grand continental arena for African collegiate forensics. Delegation deployments and trial schedules manage selection internally.",
    registrationUrl: "/events/paudc-2026/register"
  },
  {
    id: "weekly-bp-training",
    type: "RECURRING_LOOP",
    status: "ONGOING",
    title: "Forensic Case Training & Matter Loading",
    dateString: "EVERY WEDNESDAY // 16:00",
    sortDate: "2026-07-08",
    location: "PRIMARY LECTURE THEATER",
    format: "BRITISH PARLIAMENTARY",
    description: "Mandatory weekly training targeting case mechanisms, dynamic extensions, and refutation diagnostics."
  }
];

const ITEMS_PER_PAGE = 5;

export default function EventsRegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "HOST" | "CIRCUIT" | "ROUTINE">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRegistryLoading, setIsRegistryLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const filteredAndSearchedEvents = useMemo(() => {
    return REGISTRY_DATA.filter((event) => {
      const matchesFilter =
        activeFilter === "ALL" ||
        (activeFilter === "HOST" && event.type === "INTERNAL_HOST") ||
        (activeFilter === "CIRCUIT" && event.type === "EXTERNAL_MAJOR") ||
        (activeFilter === "ROUTINE" && event.type === "RECURRING_LOOP");

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.format.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSearchedEvents.length / ITEMS_PER_PAGE));
  
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSearchedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSearchedEvents, currentPage]);

  const triggerStateShift = (action: () => void) => {
    setIsRegistryLoading(true);
    setTimeout(() => {
      action();
      setIsRegistryLoading(false);
    }, 450);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 flex flex-col h-[calc(100vh-var(--header-height,4.5rem))] overflow-hidden">
      
      {/* 1. STICKY TOP CONTROLS DECK */}
      <SectionReveal className="bg-background pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-0.5">
            Archival Record
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            The Event Registry
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search registry indices..."
              className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 pl-9 text-xs text-text-primary focus:outline-hidden focus:border-primary font-body placeholder:text-text-muted transition-colors shadow-xs"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-1 border border-border bg-surface p-0.5 rounded-lg text-[10px] font-mono select-none shadow-xs">
            {(["ALL", "HOST", "CIRCUIT", "ROUTINE"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => triggerStateShift(() => setActiveFilter(filter))}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-text-inverse font-bold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* 2. FIXED STICKY TABLE LAYER HEADER */}
      <div className="hidden lg:grid grid-cols-12 gap-6 px-6 py-2.5 bg-surface-muted/60 border border-border rounded-t-xl text-[10px] font-mono uppercase tracking-wider text-text-muted shrink-0">
        <div className="col-span-3">Chronological Meta</div>
        <div className="col-span-6">Core Ledger Descriptions</div>
        <div className="col-span-3 text-right">Deployment Status</div>
      </div>

      {/* 3. SCROLLABLE REGISTRY SCROLLBOX (Perfect Height Calculation for 5 Items) */}
      <div className="relative flex-1 min-h-0 border-x border-b lg:border-t-0 border-border rounded-b-xl lg:rounded-b-xl lg:rounded-t-none bg-surface overflow-y-auto custom-scrollbar shadow-xs">
        
        {isRegistryLoading && (
          <div className="absolute inset-0 bg-background/60 z-50 flex flex-col items-center justify-center backdrop-blur-xs">
            <div className="relative w-10 h-10 flex flex-col justify-between items-center animate-spin [animation-duration:1.8s]">
              <div className="w-7 h-4 border-2 border-primary bg-surface rounded-t-full border-b-0 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 bg-accent h-full animate-[pulse_1s_infinite]" />
              </div>
              <div className="w-1 h-1.5 bg-primary z-10" />
              <div className="w-7 h-4 border-2 border-primary bg-surface rounded-b-full border-t-0 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 bg-accent h-0 animate-[pulse_1s_infinite] [animation-delay:0.5s]" />
              </div>
            </div>
          </div>
        )}

        {paginatedEvents.length === 0 ? (
          <div className="flex items-center justify-center h-full py-12 text-center">
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider">
              // Zero matches identified across records
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {paginatedEvents.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-6 px-6 py-3.5 items-start lg:items-center transition-colors hover:bg-surface-muted/20"
              >
                {/* Meta Segment */}
                <div className="lg:col-span-3 font-mono text-[11px] text-text-secondary space-y-0.5 w-full">
                  <div className="font-bold text-text-primary flex items-center justify-between lg:block">
                    <span className="tracking-tight">{event.dateString}</span>
                    <span className={`lg:hidden text-[9px] px-2 py-0.5 rounded-xs font-body font-semibold tracking-wide ${
                      event.status === "REGISTRATION_OPEN" ? "bg-accent/10 text-text-primary" : "bg-text-muted/10 text-text-muted"
                    }`}>
                      {event.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-[9px] text-text-muted tracking-wide uppercase">{event.location}</div>
                </div>

                {/* Core Details Segment */}
                <div className="lg:col-span-6 space-y-0.5 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted bg-surface-muted border border-border px-1.5 py-0.25 rounded-xs">
                      {event.format}
                    </span>
                  </div>
                  <p className="font-body text-sm font-bold text-text-primary uppercase tracking-wide leading-tight m-0 group-hover:translate-x-0.5 transition-transform duration-200">
                    {event.title}
                  </p>
                  <p className="text-xs text-text-secondary font-body leading-normal m-0 max-w-2xl line-clamp-2 lg:line-clamp-none">
                    {event.description}
                  </p>
                </div>

                {/* Action Segment */}
                <div className="lg:col-span-3 w-full flex items-center lg:justify-end pt-1 lg:pt-0">
                  {event.registrationUrl && event.status === "REGISTRATION_OPEN" ? (
                    <Button href={event.registrationUrl} className="w-full lg:w-auto text-[10px] py-1.5 px-3.5">
                      Register Dispatch
                    </Button>
                  ) : (
                    <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase pl-1">
                      // {event.status.replace("_", " ")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. STICKY PAGINATION FOOTER */}
      {filteredAndSearchedEvents.length > 0 && (
        <SectionReveal className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 shrink-0 bg-background">
          <div className="text-[11px] font-mono text-text-muted">
            Showing records <span className="text-text-primary font-bold">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to{" "}
            <span className="text-text-primary font-bold">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSearchedEvents.length)}
            </span>{" "}
            of <span className="text-text-primary font-bold">{filteredAndSearchedEvents.length}</span> logs
          </div>

          <div className="flex items-stretch justify-center gap-1 font-mono text-[11px] ">
            <button
              onClick={() => triggerStateShift(() => setCurrentPage((prev) => prev - 1))}
              disabled={currentPage === 1 || isRegistryLoading}
              className="p-1 rounded-xs border border-border bg-surface text-text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-muted"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => triggerStateShift(() => setCurrentPage(pageNumber))}
                  disabled={isRegistryLoading}
                  className={`p-1 rounded-xs px-3 border transition-all ${
                    currentPage === pageNumber
                      ? "bg-primary text-text-inverse border-primary font-bold"
                      : "bg-surface text-text-primary border-border hover:bg-surface-muted"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => triggerStateShift(() => setCurrentPage((prev) => prev + 1))}
              disabled={currentPage === totalPages || isRegistryLoading}
              className="p-1 rounded-xs border border-border bg-surface text-text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-muted"
            >
              <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </SectionReveal>
      )}
    </div>
  );
}