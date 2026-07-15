"use client";

import React from "react";
import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import NoteSheafCard from "@/components/ui/sheaf-cards";
import timeline from "./data/timeline.json";
import execCouncil from "./data/exec-council.json";
import pillars from "./data/pillars.json";
import { EditorialProfileCard } from "@/components/ui/editorial-image";
import { CloudinaryImage } from "@/components/cl-image";

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
              <span className="font-garamond text-4xl sm:text-5xl font-light pr-2 tracking-tight text-text-primary leading-tight">
                Once upon a time,
              </span>
              a handful of students gathered around a simple idea: that the best
              conversations begin with curiosity. What started as late-night
              debates between friends slowly grew into a community where ideas
              are welcomed, perspectives are challenged with respect, and every
              voice has the chance to grow. Today, the University of Nigeria
              Debating Society is home to students from every walk of campus
              life. Some are discovering debate for the first time, others
              pursuing excellence on competitive stages, but all united by a
              shared love of learning, thoughtful dialogue, and the courage to
              speak with conviction.
            </p>
          </div>

          {/* Core Visual Spread */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            <div className="col-span-12 relative group p-1">
              <NoteSheafCard>
                <div className="relative w-full h-72 sm:h-96 rounded-xs overflow-hidden border border-border">
                  <CloudinaryImage
                    src="https://res.cloudinary.com/boo1tgkf/image/upload/v1784069440/PXL_20240209_180423869.MV_tv0roj.jpg"
                    alt="Collegiate Assembly"
                    className="object-cover"
                  />
                </div>
              </NoteSheafCard>
            </div>
          </div>
        </SectionReveal>

        {/* Legacy In Numbers / Active Metrics */}
        <SectionReveal className="border-t border-border/40 pt-16 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left md:text-center">
            <div className="flex flex-col gap-2">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-primary">
                60+
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Active Members
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-primary">
                10+
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Tournament Titles
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="block font-serif text-4xl sm:text-5xl font-black text-primary">
                4+
              </span>
              <span className="block text-xs font-manrope font-bold tracking-wider uppercase text-text-secondary mt-1">
                Years of Debate
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Story Tree Timeline */}
        <SectionReveal className="border-t border-border/40 pt-16 flex flex-col gap-3">
          <div className="max-w-2xl mb-24 text-left  mx-auto md:text-center">
            <h2 className="font-garamond text-3xl font-light tracking-tight text-text-primary">
              Through the Years
            </h2>
          </div>

          {/* Central Trunk Layout with Alternating Curved Branches */}
          <div className="relative max-w-5xl mx-auto pl-8 md:pl-0">
            {/* The Spine Trunk */}
            <div className="absolute left-2.75 md:left-1/2 top-0 bottom-0 w-0.75 bg-[#2e3a28]/20 -translate-x-1/2" />

            <div className="space-y-24 relative">
              {timeline.map((entry, idx) => {
                const isRight = idx % 2 === 1;
                return (
                  <div
                    key={entry.date}
                    className={`flex flex-col md:flex-row items-stretch relative group ${isRight ? "md:justify-end" : "md:justify-start"}`}
                  >
                    <div className="absolute -left-5.25 md:left-1/2 top-6 w-6 h-6 rounded-full border-4 border-[#2e3a28] bg-[#fcfbf9] -translate-x-1/2 z-10 shadow-xs group-hover:scale-110 transition-transform duration-300" />

                    {/* Curved Branch Line SVG */}
                    <div
                      className={`hidden md:block absolute top-8 w-15 h-10 ${isRight ? "left-1/2 translate-x-[-1.5px]" : "right-1/2 translate-x-[1.5px]"}`}
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
                        <span className="font-serif text-2xl font-black text-text-primary block mb-2">
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
                        <p className="text-sm text-text-primary!  leading-relaxed">
                          {entry.description}
                        </p>
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

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {execCouncil.map((member, idx) => (
            <EditorialProfileCard
              key={idx}
              name={member.name}
              nickname={member.nickname}
              role={member.role}
              image={member.image}
            />
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
            Every week brings new ideas to explore, new arguments to refine, and
            new opportunities to grow. From your first practice debate to
            national competitions, every activity is designed to help you think
            more clearly, speak more confidently, and learn alongside a
            community that challenges and supports you.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-6 text-left flex flex-col gap-4">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-4 border p-4">
              <span className="font-manrope text-xs font-bold text-primary pt-0.5">
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
          The best time to have joined the Society was when you first heard of
          it. The second best time is now. We welcome new members everyday,
          everytime, everywhere. All you need is a willingness to know, and a
          desire to grow, and and hot takes to throw. And if you're feeling that
          it's to big a step to take, don't worry. Everyone starts somewhere. We
          have a place for you, and a path to get you there.
        </p>
      </SectionReveal>
    </div>
  );
}
