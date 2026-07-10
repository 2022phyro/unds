import React from "react";
import Link from "next/link";
import { HeroCacophony } from "./hero-cacophony";
import TESTIMONIALS from "./data/testimonials.json";
import WHAT_WE_DO from "./data/what-we-do.json";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { BookmarkButton, Button } from "@/components/ui/bookmark-button";
import { ChamberGazette } from "./chamber-gazette";
import { HomeContactBlock } from "./contact-us";
import { NewsletterSignup } from "./newsletter-signup";
import { ChampionshipWins } from "./championship-win";
import { SectionReveal } from "@/components/ui/section-reveal";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white block opacity-100 visibility-visible">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-16">
        {/* HERO FOLD — Completely native, zero hidden states */}
        <SectionReveal>
          <div className="border-b border-border pb-16 pt-2">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Narrative Frame */}
              <div className="lg:col-span-7 flex flex-col gap-4 justify-center">
                <span className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-text-secondary">
                  University of Nigeria Debating Society // Meet the Spartans
                </span>

                {/* Plain native typography to ensure text paints immediately */}
                <h1 className="max-w-3xl text-[clamp(2.8rem,7vw,5.8rem)] font-black leading-[0.96] tracking-tight text-text-primary m-0 font-heading">
                  Welcome to <span className="text-accent">UNDS</span>
                </h1>

                <p className="mt-4 max-w-xl text-[clamp(1.4rem,3.2vw,2.1rem)] leading-tight text-text-secondary m-0 font-garamond">
                  Home of intellectual discourse & competitive forensics
                  excellence.
                </p>

                <p className="mt-2 max-w-xl font-body text-xs sm:text-sm leading-relaxed text-text-muted m-0">
                  We forge analytical thinkers, master wordsmiths, and public
                  advocates who command premium tournament circuits globally.
                  This is the proving ground for the sharpest minds.
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono font-bold">
                  <Button className="h-14 text-lg! capitalize! font-medium lg:w-80 sm:w-auto">
                    Register Now &rarr;

                  </Button>

                </div>
              </div>

              {/* Right Interactive Canvas Column */}
              <div className="lg:col-span-5">
                <HeroCacophony />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ACCOLADES SHOWCASE LEDGER — Plain HTML container avoids execution hangs */}
          <div className="border-b border-border py-16">
            <div className="mb-12 lg:mb-20">
              <h2 className="mt-1 font-garamond text-lg text-text-primary font-semibold tracking-wide m-0">
                Proven Track Records
              </h2>
            </div>

            <ChampionshipWins />
          </div>

        {/* OPERATIONS: PILLARS OF ADVOCACY */}
        <SectionReveal>
          <div className="border-b border-border py-16">
            <div className="mb-12">
              <h2 className="mt-1 font-garamond font-semibold text-lg text-text-primary tracking-wide m-0">
                Inside the Rooms
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x divide-border">
              {WHAT_WE_DO.map((pillar, index) => (
                <div
                  key={pillar.index}
                  className={`flex flex-col ${index === 0 ? "md:pr-8" : index === 1 ? "md:px-8" : "md:pl-8"}`}
                >
                  <span className="mb-2 font-mono text-xs font-bold text-accent">
                    0{pillar.index}
                  </span>
                  <h4 className="mb-2 text-text-primary font-playfair capitalize   tracking-wide m-0">
                    {pillar.title}
                  </h4>
                  <p className="font-body text-xs leading-relaxed text-text-secondary m-0">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* TESTIMONIALS REPUTATION MODULE */}
        {/* <SectionReveal>
          <div className="border-b border-border py-16">
            <div className="mb-8">
              <h2 className="mt-1 text-lg font-garamond font-semibold text-text-primary tracking-wide m-0">
                What they say
              </h2>
            </div>
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </SectionReveal> */}

        {/* JOURNAL ARCHIVE DESK */}
        <SectionReveal>
          <div className="py-16">
            <div className="mb-8">
              <h2 className="mt-1 text-lg font-garamond font-semibold text-text-primary tracking-wide m-0">
                Trending
              </h2>
            </div>
            <ChamberGazette />
          </div>
        </SectionReveal>

        {/* NEWSLETTER SIGNUP */}
        <SectionReveal>
          <div className="py-16">
            <NewsletterSignup />
          </div>
        </SectionReveal>

        {/* OUTBOUND DISPATCH TERMINAL */}
        <div className="border-t border-border py-16">
          <HomeContactBlock />
        </div>
      </div>
    </div>
  );
}
