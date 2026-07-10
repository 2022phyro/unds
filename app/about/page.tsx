"use client";

import React from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import NoteSheafCard from "@/components/ui/sheaf-cards";
import timeline from "./data/timeline.json";
import execCouncil from "./data/exec-council.json";
import pillars from "./data/pillars.json";

/* -------------------------------------------------------------------------- */
/* THE BOOK MOTIF / SHEAF OF NOTES CARD COMPONENT                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* MAIN ABOUT PAGE LAYOUT                                                     */
/* -------------------------------------------------------------------------- */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 space-y-36">
      {/* ─── 1. OUR STORY ─────────────────────────────────────────────────── */}
      <section className="space-y-20">
        {/* Intro Hero Section */}
        <SectionReveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <p className="text-lg text-text-secondary leading-relaxed font-garamond font-medium">
              <span className="font-garamond text-4xl sm:text-5xl font-light tracking-tight text-text-primary leading-tight">
                Once upon a time,{" "}
              </span>
              we began in the quiet corners of late-night common rooms, born
              from a simple, urgent realization: that raw eloquence means
              nothing without structural logic and cold, analytical depth. What
              began as a sanctuary for intense argument has grown into an
              enduring collective. We do not build performers; we train human
              systems to deconstruct policies, examine structural friction
              layers with absolute clarity, and defend truths under intense
              competitive pressure.
            </p>
          </div>

          {/* Core Visual Spread */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            <div className="col-span-12 relative group p-1">
              <NoteSheafCard>
                <div className="relative w-full h-72 sm:h-96 rounded-xs overflow-hidden border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                    alt="Collegiate Assembly"
                    fill
                    className="object-cover"
                  />
                </div>
              </NoteSheafCard>
            </div>
          </div>
        </SectionReveal>

        {/* Legacy In Numbers / Active Metrics */}
        <SectionReveal className="border-t border-border/40 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left md:text-center">
            <div>
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#2e3a28]">
                150+
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Active Members
              </span>
            </div>
            <div>
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#2e3a28]">
                40+
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Tournament Titles
              </span>
            </div>
            <div>
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#2e3a28]">
                25+
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Years of Debate
              </span>
            </div>
            <div>
              <span className="block font-serif text-4xl sm:text-5xl font-black text-[#2e3a28]">
                7
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Countries Represented
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Story Tree Timeline */}
        <SectionReveal className="border-t border-border/40 pt-16">
          <div className="max-w-2xl mb-24 text-left mx-auto md:text-center">
            <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.25em] text-text-secondary block mb-1">
              // Story Tree
            </span>
            <h2 className="font-garamond text-3xl font-light tracking-tight text-text-primary">
              The Society's Timeline
            </h2>
          </div>

          {/* Central Trunk Layout with Alternating Curved Branches */}
          <div className="relative max-w-5xl mx-auto pl-8 md:pl-0">
            {/* The Spine Trunk */}
            <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[3px] bg-[#2e3a28]/20 -translate-x-1/2" />

            <div className="space-y-24 relative">
              {timeline.map((entry, idx) => {
                const isRight = idx % 2 === 1;
                return (
                  <div
                    key={entry.date}
                    className={`flex flex-col md:flex-row items-stretch relative group ${isRight ? "md:justify-end" : "md:justify-start"}`}
                  >
                    <div className="absolute left-[-21px] md:left-1/2 top-6 w-6 h-6 rounded-full border-4 border-[#2e3a28] bg-[#fcfbf9] -translate-x-1/2 z-10 shadow-xs group-hover:scale-110 transition-transform duration-300" />

                    {/* Curved Branch Line SVG */}
                    <div
                      className={`hidden md:block absolute top-8 w-[60px] h-[40px] ${isRight ? "left-1/2 translate-x-[-1.5px]" : "right-1/2 translate-x-[1.5px]"}`}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 60 40"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d={
                            isRight
                              ? "M0,0 C30,0 60,20 60,40"
                              : "M60,0 C30,0 0,20 0,40"
                          }
                          stroke="#2e3a28"
                          strokeWidth="2"
                          strokeOpacity="0.4"
                          className="group-hover:stroke-opacity-80 transition-opacity duration-300"
                        />
                      </svg>
                    </div>

                    <div
                      className={`w-full md:w-[calc(50%-50px)] self-start ${isRight ? "md:ml-12" : "md:mr-12"}`}
                    >
                      <NoteSheafCard>
                        <span className="font-serif text-2xl font-black text-[#2e3a28] block mb-2">
                          {entry.date}
                        </span>
                        <div className="relative w-full h-48 rounded-xs overflow-hidden border border-border mb-4">
                          <Image
                            src={entry.imageUrl}
                            alt={entry.imageAlt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm text-[#2e3a28]!  leading-relaxed">
                          {entry.description}
                        </p>
                        <span className="block text-[10px] font-manrope italic text-[#2e3a28] border-t border-border/40 pt-2 mt-3">
                          {entry.caption}
                        </span>
                      </NoteSheafCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ─── 2. MEET THE PEOPLE BEHIND IT (EXECUTIVE COUNCIL) ────────────────── */}
      <SectionReveal className="border-t border-border/40 pt-20 flex flex-col items-center justify-start gap-4">
        <div className="text-center md:text-left">
          <h2 className="font-garamond text-2xl font-light tracking-tight text-text-primary">
            Executive Council
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {execCouncil.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-4 p-2 pt-5 border rounded-sm"
            >
              <div className="relative w-20 h-20 rounded-full border border-[#2e3a28]/40 overflow-hidden shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 w-full flex flex-1 flex-col gap-1 items-center text-center">
                <h4 className="font-garamond text-lg font-bold text-text-primary">
                  {member.name}
                </h4>
                <span className="text-xs font-manrope font-bold  block uppercase tracking-wider">
                  {member.role}
                </span>
                <div className="h-[1px] w-[80%] rounded-md bg-[#2e3a28]/20 mx-auto my-1" />

                <p className="text-sm text-text-muted pt-2 leading-relaxed font-manrope">
                  {member.spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* ─── 3. LIFE INSIDE UNDS ───────────────────────────────────────────── */}
      <SectionReveal className="border-t border-border/40 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4 text-left">
          <span className="text-[10px] font-manrope font-bold uppercase tracking-[0.25em] text-text-secondary block">
            // Life Inside UNDS
          </span>
          <h2 className="font-garamond text-3xl font-light tracking-tight text-text-primary">
            What we do
          </h2>
          <p className="text-sm text-text-muted leading-relaxed font-manrope">
            Our routine operates as an active internal grid. We move from theory
            labs into high-pressure simulated environments to ensure arguments
            hold weight under fire.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-6 text-left flex flex-col gap-4">
          {pillars.map((pillar, idx) => (
              <div key={idx} className="flex items-start gap-4 border p-4">
                <span className="font-manrope text-xs font-bold text-[#2e3a28] pt-0.5">
                  0{idx + 1} //
                </span>
                <div>
                  <h4 className="font-garamond text-lg font-bold text-text-primary mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed font-manrope">
                    {pillar.details}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </SectionReveal>

      {/* ─── 4. BECOME PART OF THE STORY ────────────────────────────────────── */}
      <SectionReveal className="border-t border-border/40 pt-20 text-center max-w-3xl mx-auto space-y-6">

        <h2 className="font-garamond text-4xl font-light tracking-tight text-text-primary">
          Become Part of the Story
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed font-manrope max-w-xl mx-auto">
          The best time to have joined the Society was when you first heard of it.
          The second best time is now. We welcome new members everyday, everytime, everywhere.
          All you need is a willingness to know, and a desire to grow, and and hot takes to throw.
          And if you're feeling that it's to big a step to take, don't worry. Everyone starts somewhere. We have a place for you, and a path to get you there.
        </p>
      </SectionReveal>
    </div>
  );
}
