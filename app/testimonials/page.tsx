"use client";

import React from "react";
import { HeroFireflies } from "@/components/fireflies";

const FEATURED_TESTIMONIAL = {
  quote:
    "Before UNDS, I thought debating was about having the last word. The Spartans taught me that it is actually about structuring an unassailable worldview in under seven minutes. The intellectual rigour I absorbed in those chambers didn't just win us championships—it rewrote the trajectory of my entire legal career.",
  author: "Chidi Okechukwu",
  role: "Senior Associate, Templars Law // UNDS President '16",
  achievement: "All-African Public Speaking Champion",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
};

const SOCIETY_VOICES = [
  {
    quote:
      "The strategic thinking demanded by British Parliamentary debating is identical to top-tier management consulting. Competing globally with UNDS was the hardest and most rewarding thing I did at university.",
    author: "Amara Nwosu",
    role: "Strategy Analyst, McKinsey & Co.",
    context: "Pan-African Universities Debating Championship Finalist",
  },
  {
    quote:
      "Adjudicating for the Spartans means holding some of the sharpest minds in the country to international forensic standards. The caliber of analytical clarity generated here is world-class.",
    author: "Dr. Emmanuel Kalu",
    role: "Senior Lecturer & UNDS Chief Adjudicator",
    context: "World Universities Debating Championship (WUDC) Master",
  },
  {
    quote:
      "As a freshman, walking into the UNDS chambers was intimidating. But the mentorship structure here is deliberate. They don't just critique your style; they break down your logic and rebuild you into a master advocate.",
    author: "Tobi Adebayo",
    role: "Final Year Law Student",
    context: "Current UNDS Chief Whip // Open Quarterfinalist",
  },
  {
    quote:
      "The strategic thinking demanded by British Parliamentary debating is identical to top-tier management consulting. Competing globally with UNDS was the hardest and most rewarding thing I did at university.",
    author: "Amara Nwosu",
    role: "Strategy Analyst, McKinsey & Co.",
    context: "Pan-African Universities Debating Championship Finalist",
  },
  {
    quote:
      "Adjudicating for the Spartans means holding some of the sharpest minds in the country to international forensic standards. The caliber of analytical clarity generated here is world-class.",
    author: "Dr. Emmanuel Kalu",
    role: "Senior Lecturer & UNDS Chief Adjudicator",
    context: "World Universities Debating Championship (WUDC) Master",
  },
  {
    quote:
      "As a freshman, walking into the UNDS chambers was intimidating. But the mentorship structure here is deliberate. They don't just critique your style; they break down your logic and rebuild you into a master advocate.",
    author: "Tobi Adebayo",
    role: "Final Year Law Student",
    context: "Current UNDS Chief Whip // Open Quarterfinalist",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden text-text-primary selection:bg-primary/20">
      {/* Subtle background paper-grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Floating firefly engine */}
      <HeroFireflies />
      {/* --- SECTION 1: EDITORIAL HEADER --- */}
      <section className="relative pt-24 pb-16 border-b border-border/60 mx-auto max-w-7xl px-6 sm:px-8 z-10">
        <p className="mt-6 max-w-2xl font-garamond text-xl sm:text-2xl italic leading-relaxed text-text-secondary">
          From international grand finals to corporate boardrooms; our alumni
          and members reflect on the transformational power of informed
          discourse.
        </p>
      </section>
      {/* --- SECTION 2: THE LAUREATE FEATURE PROFILE (Asymmetric Layout) --- */}
      <section className="relative py-16 lg:py-24 border-b border-border/60 mx-auto max-w-7xl px-6 sm:px-8 z-10">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-12 lg:gap-16">
          {/* Left Block: The Landscape Exhibition Plate */}
          <div className="w-full lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md rotate-[-2deg] transition-transform duration-500 hover:rotate-0">
              {/* Stacked sheet behind */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-[1.5deg] rounded-xs border border-border bg-surface shadow-xs" />

              <div className="relative rounded-xs border border-border bg-surface p-4 shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-neutral-900">
                  <img
                    src={FEATURED_TESTIMONIAL.image}
                    alt={FEATURED_TESTIMONIAL.author}
                    className="h-full w-full object-cover contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-primary mix-blend-color opacity-[0.15] pointer-events-none" />
                </div>
                <div className="mt-3 flex justify-between text-[10px] font-ui tracking-widest text-text-muted ">
                  <span>{FEATURED_TESTIMONIAL.achievement}</span>
                  <span>LAUREATE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Large Format Quote */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-4xl font-serif text-primary/40 leading-none h-3 pointer-events-none">
              “
            </span>
            <blockquote className="m-0 font-garamond text-2xl sm:text-2xl  leading-relaxed text-text-primary">
              {FEATURED_TESTIMONIAL.quote}
            </blockquote>
            <span className="text-4xl font-serif text-primary/40 leading-none h-3 text-right block pointer-events-none -translate-y-4">
              ”
            </span>

            <div className="mt-6 pt-6 border-t border-border/40">
              <cite className="not-italic block font-heading text-lg tracking-tight text-text-primary">
                {FEATURED_TESTIMONIAL.author}
              </cite>
              <span className="block font-ui text-xs  tracking-wider text-text-muted mt-1">
                {FEATURED_TESTIMONIAL.role}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* --- SECTION 3: LINEAR SCHOLARLY ARCHIVE GRID --- */}
      <section className="relative py-16 lg:py-24 mx-auto max-w-7xl px-6 flex flex-col gap-5 sm:px-8 z-10">
        <h2 className="font-heading text-xs  tracking-[0.3em] text-text-muted mb-12">
          What people saying
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
          {SOCIETY_VOICES.map((voice, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between border-t border-border/80 pt-6 transition-colors duration-300 hover:border-primary/60"
            >
              {/* Archive Index Marker */}
              <span className="absolute -top-2.5 right-0 font-ui text-[10px] text-text-muted/60 group-hover:text-primary transition-colors">
                [0{idx + 1}]
              </span>

              <p className="font-body text-sm leading-relaxed text-text-secondary m-0">
                "{voice.quote}"
              </p>

              <div className="mt-8">
                <h3 className="font-playfair text-2xl! text-base tracking-tight text-text-primary m-0">
                  {voice.author}
                </h3>
                <span className="block font-ui text-[11px] text-text-muted  tracking-wider mt-1 leading-snug">
                  {voice.role}
                </span>
                <span className="block font-serif text-[12px] text-primary/80 italic mt-1.5">
                  {voice.context}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
