"use client";

import React, { useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";

type SupportTier = "DELEGATE" | "CHAMBER" | "FOUNDATION";

export default function SupportDeskPage() {
  const [activeTier, setActiveTier] = useState<SupportTier>("DELEGATE");
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successState, setSuccessState] = useState(false);

  // High-density data ledger mapping funding goals
  const tierDetails = {
    DELEGATE: {
      title: "Delegate Deployment Fund",
      description: "Directly sponsors transport, institutional registration fees, and accommodation for dynamic speakers fighting on regional and national circuits.",
      defaultAmount: "25000",
      impact: "Covers local tournament clearance parameters for a single speaking team."
    },
    CHAMBER: {
      title: "Chamber & Tournament Endowment",
      description: "Funds the physical hosting infrastructure for opens, cross-university exhibition fixtures, and deep analytical training materials.",
      defaultAmount: "100000",
      impact: "Sponsors audio-visual and physical adjudication assets for institutional tournaments."
    },
    FOUNDATION: {
      title: "Global Excellence Foundation",
      description: "A prestige allocation aimed at sending elite teams across international boundaries to championships like PAUDC and WUDC.",
      defaultAmount: "500000",
      impact: "Establishes long-term operational autonomy for continental championship deployments."
    }
  };

  const handleSupportSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate data engine clearance delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessState(true);
      setCustomAmount("");
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12 flex flex-col lg:h-[calc(100vh-var(--header-height,4.5rem))] overflow-hidden">
      
      {/* STICKY TOP DESK HEADER */}
      <SectionReveal className="bg-background pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 border-b border-border/40">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-0.5">
            Institutional Patronage
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Support the Society
          </h1>
        </div>
        <p className="font-body text-xs text-text-secondary max-w-md m-0 leading-relaxed md:text-right">
          Empower analytical rigor, high-impact public speaking, and regional dominance across West African and international circuits.
        </p>
      </SectionReveal>

      {/* CORE SPLIT-PANE WORKSPACE */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 overflow-y-auto lg:overflow-hidden custom-scrollbar">
        
        {/* LEFT COMPONENT LAYER: Impact Analytics & Ledger (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-full lg:overflow-y-auto pr-0 lg:pr-2 custom-scrollbar shrink-0">
          
          {/* Institutional Integrity Plaque */}
          <SectionReveal className="border border-border bg-surface p-5 rounded-xl shadow-xs space-y-3">
            <span className="font-mono text-[9px] tracking-widest text-accent uppercase font-bold block">
              // Accountability Ledger
            </span>
            <p className="font-body text-sm font-bold text-text-primary uppercase tracking-wide m-0">
              Where Your Support Directs
            </p>
            <p className="font-body text-xs text-text-secondary leading-relaxed m-0">
              The society operates under strict transparency guidelines. Every resource allocation is directly audited to optimize team logistics, public debate access, and academic research reserves.
            </p>
          </SectionReveal>

          {/* Quick Metrics Statistics Panel */}
          <SectionReveal className="border border-border bg-surface-muted/30 p-5 rounded-xl divide-y divide-border/60 space-y-4">
            <div className="pt-0">
              <span className="font-mono text-[20px] font-bold text-text-primary tracking-tight">84%</span>
              <p className="font-body text-[11px] text-text-secondary uppercase tracking-wider font-semibold m-0">
                Direct Deployment Ratio (Logistics & Registration)
              </p>
            </div>
            <div className="pt-4">
              <span className="font-mono text-[20px] font-bold text-text-primary tracking-tight">150+</span>
              <p className="font-body text-[11px] text-text-secondary uppercase tracking-wider font-semibold m-0">
                Students Empowered Annually Through Forums
              </p>
            </div>
            <div className="pt-4">
              <span className="font-mono text-[20px] font-bold text-text-primary tracking-tight">0%</span>
              <p className="font-body text-[11px] text-text-secondary uppercase tracking-wider font-semibold m-0">
                Administrative Leakage (Pure Merit Allocations)
              </p>
            </div>
          </SectionReveal>

        </div>

        {/* RIGHT COMPONENT LAYER: Interactive Patronage Terminal (7 Columns) */}
        <div className="lg:col-span-7 h-full flex flex-col bg-surface border border-border rounded-xl shadow-xs overflow-hidden">
          
          {/* Internal Tab Filters */}
          <div className="flex border-b border-border bg-surface-muted/30 p-2 gap-2 shrink-0">
            {(["DELEGATE", "CHAMBER", "FOUNDATION"] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => {
                  setActiveTier(tier);
                  setSuccessState(false);
                }}
                className={`flex-1 py-2 text-center font-mono text-[10px] uppercase tracking-wider rounded-md transition-all ${
                  activeTier === tier
                    ? "bg-primary text-text-inverse font-bold shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Dynamic Interactive Desk Form */}
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar">
            {successState ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <p className="font-body text-base font-bold text-text-primary uppercase tracking-wide m-0">
                  Patronage Dispatch Verified
                </p>
                <p className="font-body text-xs text-text-secondary max-w-sm leading-relaxed m-0">
                  Your transactional pledge intent has successfully registered on our ledger. An official institutional receipt and documentation package will issue shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessState(false)}
                  className="mt-2 font-mono text-[10px] text-accent uppercase tracking-wider underline hover:text-text-primary transition-colors"
                >
                  Initiate New Protocol Ledger
                </button>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmission} className="space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Dynamic Configuration Fields */}
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[9px] text-accent uppercase font-bold block tracking-wider mb-1">
                      // Selected Objective Objective
                    </span>
                    <h3 className="font-body text-base font-bold text-text-primary uppercase tracking-wide m-0">
                      {tierDetails[activeTier].title}
                    </h3>
                    <p className="font-body text-xs text-text-secondary leading-relaxed mt-1 mb-0">
                      {tierDetails[activeTier].description}
                    </p>
                  </div>

                  {/* Impact Highlight Frame */}
                  <div className="p-3 bg-surface-muted/50 border border-border rounded-lg font-body">
                    <span className="text-[9px] font-mono text-text-muted font-bold uppercase block tracking-wider mb-0.5">
                      Direct Structural Impact:
                    </span>
                    <p className="text-xs text-text-primary font-medium m-0 leading-normal">
                      {tierDetails[activeTier].impact}
                    </p>
                  </div>

                  {/* Amount Inputs Vector */}
                  <div className="space-y-2 pt-2">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Assign Funding Weight (₦ NGN)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCustomAmount(tierDetails[activeTier].defaultAmount)}
                        className={`py-2.5 text-xs font-mono border rounded-lg transition-all ${
                          customAmount === tierDetails[activeTier].defaultAmount
                            ? "border-primary bg-primary/5 text-text-primary font-bold"
                            : "border-border bg-background text-text-secondary hover:border-text-muted"
                        }`}
                      >
                        Default: ₦{Number(tierDetails[activeTier].defaultAmount).toLocaleString()}
                      </button>
                      <div className="relative">
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Custom Value"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-text-primary font-mono focus:outline-hidden focus:border-primary placeholder:text-text-muted transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Verification Button Layer */}
                <div className="pt-6 border-t border-border/60 shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting || !customAmount}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-[#2e3a28] py-2.5 text-xs font-mono font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#20291c] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2 animate-pulse">
                        Clearing Ledger Rails...
                      </span>
                    ) : (
                      "Authorize Patronage Pipeline"
                    )}
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