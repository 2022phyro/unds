"use client";

import React, { use, useMemo, useState } from "react";
import Link from "next/link";

interface RegisterPageProps {
  params: Promise<{ eventId: string }>;
}

const EVENT_DIRECTORY_DATABASE: Record<string, { title: string; format: string; description: string; imageUrl?: string; location: string; date: string }> = {
  "varsity-open-2026": {
    title: "The Varsity Forensics Open",
    format: "BRITISH PARLIAMENTARY",
    location: "UNN CAMPUS",
    date: "OCT 22-25, 2026",
    description: "Our premier annual inter-collegiate collision. Bringing together top-tier institutions across West African circuits to battle through 6 preliminary rounds toward an elite breakout bracket.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800"
  },
  "paudc-2026": {
    title: "Pan-African Universities Debating Championship",
    format: "BRITISH PARLIAMENTARY",
    location: "ACCRA, GHANA",
    date: "DEC 05-13, 2026",
    description: "The grand continental arena for African collegiate forensics. Official institutional delegations must lock parameters through this registration desk portal.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800"
  }
};

export default function EventRegistrationPage({ params }: RegisterPageProps) {
  const { eventId } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const eventDetails = useMemo(() => {
    return EVENT_DIRECTORY_DATABASE[eventId] || EVENT_DIRECTORY_DATABASE["varsity-open-2026"];
  }, [eventId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-none px-4 py-6 sm:px-8 lg:px-12 flex flex-col min-h-screen lg:h-[calc(100vh-var(--header-height,4.5rem))] overflow-x-hidden">
      
      {/* FULL-WIDTH BREADCRUMB HEADER */}
      <div className="w-full pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 border-b border-border/40">
        <div>
          <Link 
            href="/events" 
            className="text-[11px] font-mono tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1"
          >
            &larr; Back to Main Registry Ledger
          </Link>
        </div>
      </div>

      {/* FULL-CANVAS DUAL SPLIT WORKSPACE */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 min-h-0 overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT PANEL: Rich High-Density Event Details Card (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-surface border border-border rounded-xl shadow-xs overflow-hidden shrink-0">
          
          {/* Broad Landscape Aspect Image Frame */}
          {eventDetails.imageUrl && (
            <div className="relative h-64 sm:h-72 lg:h-64 w-full bg-black overflow-hidden shrink-0">
              <img 
                src={eventDetails.imageUrl} 
                alt={eventDetails.title} 
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-xs px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-text-primary border border-border rounded-sm">
                {eventDetails.format}
              </div>
            </div>
          )}

          {/* Core Dossier Copy Elements */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-surface-muted/10">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted block mb-1">
                Docket // {eventId.toUpperCase()}
              </span>
              <p className="font-body text-xl font-bold text-text-primary uppercase tracking-wide leading-tight m-0">
                {eventDetails.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-border/60 py-3 font-mono text-[10px] text-text-secondary">
              <div>
                <span className="text-text-muted block uppercase text-[9px] tracking-wide">// Location</span>
                <span className="font-bold text-text-primary text-xs">{eventDetails.location}</span>
              </div>
              <div>
                <span className="text-text-muted block uppercase text-[9px] tracking-wide">// Chronology</span>
                <span className="font-bold text-text-primary text-xs">{eventDetails.date}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider block">// Core Briefing</span>
              <p className="font-body text-xs text-text-secondary leading-relaxed m-0">
                {eventDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: High-Density Input Registry Dashboard Terminal (7 Columns) */}
        <div className="lg:col-span-7 h-full flex flex-col bg-surface border border-border rounded-xl shadow-xs overflow-hidden">
          
          <div className="p-4 border-b border-border bg-surface-muted/30 shrink-0">
            <p className="font-body text-xs font-mono uppercase tracking-widest text-text-muted m-0">
              // Registration Terminal
            </p>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-10">
                <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center text-lg font-bold">
                  ✓
                </div>
                <p className="font-body text-sm font-bold text-text-primary uppercase tracking-wide m-0">
                  Credentials Authenticated
                </p>
                <p className="font-body text-xs text-text-secondary max-w-sm leading-relaxed m-0">
                  Your institutional delegation matrix has been successfully recorded within the registry indices.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-6">
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Institution / Chapter Name
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., University of Nigeria"
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-primary transition-colors font-body shadow-2xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Delegation Count (Speakers)
                      </label>
                      <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-primary transition-colors font-mono shadow-2xs">
                        <option>1 Team (2 Speakers)</option>
                        <option>2 Teams (4 Speakers)</option>
                        <option>3 Teams (6 Speakers)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Lead Institutional Adjudicator
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Full Name"
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-primary transition-colors font-body shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Special Accommodations or Circuit Notes
                    </label>
                    <textarea 
                      rows={6}
                      placeholder="Specify independent structural burdens or timing limits requested..."
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-primary transition-colors resize-none font-body shadow-2xs"
                    />
                  </div>
                </div>

                {/* Secure bottom button entry */}
                <div className="pt-4 border-t border-border/40 shrink-0">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto float-right rounded-lg bg-[#2e3a28] px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-white transition-all hover:bg-[#20291c] disabled:opacity-40 shadow-xs"
                  >
                    {isSubmitting ? "Locking Credentials..." : "Lock Credentials & Register"}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}