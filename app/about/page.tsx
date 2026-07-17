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
import { Leaf, Sparkle, Star } from "lucide-react";

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  caption: string;
  highlights: string[];
  image: string;
}

const timelineEntries = timeline as TimelineEntry[];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-3 py-12 sm:space-y-28 sm:px-6 sm:py-16 lg:space-y-36 lg:px-8 lg:py-24">
      {/* ─── 1. OUR STORY ─────────────────────────────────────────────────── */}
      <section className="space-y-14 sm:space-y-20 flex flex-col gap-3">
        <SectionReveal className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="text-left lg:col-span-6">
            <p className="font-garamond text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
              <span className="pr-2 font-garamond text-3xl font-light leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
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

          <div className="relative grid grid-cols-12 gap-4 lg:col-span-6">
            <div className="group relative col-span-12 p-1">
              <NoteSheafCard>
                <div className="relative h-56 w-full overflow-hidden rounded-xs border border-border sm:h-72 md:h-80 lg:h-96">
                  <CloudinaryImage
                    src="https://res.cloudinary.com/boo1tgkf/image/upload/v1784069440/PXL_20240209_180423869.MV_tv0roj.jpg"
                    alt="Collegiate Assembly"
                    width={1200}
                    className="object-cover"
                  />
                </div>
              </NoteSheafCard>
            </div>
          </div>
        </SectionReveal>

        {/* Legacy In Numbers */}
        <SectionReveal className="border-t border-border/40 pt-10 pb-6 sm:pt-16">
          <div className="grid grid-cols-2 gap-6 text-left sm:gap-8 md:grid-cols-3 md:text-center">
            {[
              ["60+", "Active Members"],
              ["10+", "Tournament Titles"],
              ["4+", "Years of Debate"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col gap-1.5 sm:gap-2">
                <span className="block font-serif text-3xl font-black text-primary sm:text-4xl lg:text-5xl">
                  {value}
                </span>
                <span className="mt-1 block font-manrope text-[11px] font-bold uppercase tracking-wider text-text-secondary sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Story Tree Timeline */}
        <div className="mx-auto mb-14 text-center sm:mb-20 pb-14 w-full">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            <Leaf className="h-3.5 w-3.5" />
            Our Journey
            <Leaf className="h-3.5 w-3.5 -scale-x-100" />
          </span>
          <h2 className="mt-3 font-garamond text-3xl font-light tracking-tight text-text-primary sm:text-4xl">
            Through the Years
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-text-muted">
            <span className="h-px w-10 bg-[#2e3a28]/25" />
            <span className="h-1.5 w-1.5 rotate-45 bg-primary/60" />
            <span className="h-px w-10 bg-[#2e3a28]/25" />
          </div>
          <p className="mx-auto mt-4 font-garamond text-sm leading-relaxed text-text-secondary sm:text-base">
            A Timeline of the ideas, people and moments that have shaped
            <br />
            the University of Nigeria Debating Society into what we are today.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl pl-7 sm:pl-8 lg:pl-0">
          {/* Trunk */}
          <div className="absolute top-0 bottom-0 left-2.5 w-0.5 -translate-x-1/2 bg-[#2e3a28]/20 sm:left-2.75 sm:w-0.75 lg:left-1/2" />

          <div className="relative space-y-14 sm:space-y-16 lg:space-y-24">
            {timelineEntries.map((entry, idx) => {
              const isRight = idx % 2 === 1;
              return (
                <div
                  key={entry.date}
                  className={`group relative flex flex-col items-stretch lg:flex-row ${
                    isRight ? "lg:justify-end" : "lg:justify-start"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute top-6 left-2.5 z-10 h-4.5 w-4.5 -translate-x-1/2 rounded-full border-[3px] border-[#2e3a28] bg-[#fcfbf9] shadow-xs transition-transform duration-300 group-hover:scale-110 sm:-left-5.25 sm:h-6 sm:w-6 sm:border-4 lg:left-1/2" />

                  {/* Sub-xl branch: short tick from trunk to card */}
                  <div className="absolute top-8 left-2.5 h-px w-4 -translate-x-full bg-[#2e3a28]/30 lg:hidden" />

                  {/* xl curved branch */}
                  <div
                    className={`hidden lg:block absolute top-8 h-10 w-15 ${
                      isRight
                        ? "left-1/2 translate-x-[-1.5px]"
                        : "right-1/2 translate-x-[1.5px]"
                    }`}
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
                        className="transition-opacity duration-300 group-hover:stroke-opacity-80"
                      />
                    </svg>
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full self-start pl-5 sm:pl-6 lg:pl-0 ${
                      isRight
                        ? "lg:ml-12 lg:w-[calc(50%-50px)]"
                        : "lg:mr-12 lg:w-[calc(50%-50px)]"
                    }`}
                  >
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#2e3a28]/25 bg-[color-mix(in_srgb,var(--surface)_85%,#1a2417)] transition-colors duration-300 group-hover:border-[#2e3a28]/45">
                      {/* Main Content Area */}
                      <div
                        className={`flex flex-row flex-wrap items-stretch gap-0 lg:flex-nowrap ${
                          isRight ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Image */}
                        <div className="relative h-44 w-full shrink-0 sm:h-56 lg:h-auto lg:w-[42%]">
                          <Image
                            src={entry.image}
                            alt={entry.title}
                            fill
                            sizes="(max-width: 1023px) 100vw, 30vw"
                            className="object-cover"
                          />
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 p-5 text-left sm:p-6 lg:p-8">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                            {entry.date}
                          </span>
                          <h3 className="mt-1.5 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
                            {entry.title}
                          </h3>
                          <span className="mt-3 block h-px w-10 bg-primary/50" />
                          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                            {entry.description}
                          </p>
                        </div>
                      </div>

                      {/* Highlights Section */}
                      {entry.highlights?.length > 0 && (
                        <div className="border-t border-[#2e3a28]/15 bg-[#1a2417]/20 px-4">
                          <h4 className="mb-4 text-[10px]! font-bold uppercase tracking-widest text-primary/70!">
                            Key Milestones
                          </h4>
                          <ul className="grid gap-3 sm:grid-cols-1">
                            {entry.highlights.map((point, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 rounded-lg border border-[#2e3a28]/10 bg-[#2e3a28]/5 p-3 text-[13px] leading-relaxed text-text-secondary transition-colors hover:bg-[#2e3a28]/10"
                              >
                                <Sparkle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 2. EXECUTIVE COUNCIL ────────────────────────────────────── */}
      {/* <SectionReveal className="flex flex-col items-center justify-start gap-4 border-t border-border/40 pt-14 sm:pt-20">
        <div className="text-center md:text-left">
          <h2 className="font-garamond text-xl font-light tracking-tight text-text-primary sm:text-2xl">
            Executive Council
          </h2>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4 xl:gap-8">
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
      </SectionReveal> */}

      {/* ─── 3. LIFE INSIDE UNDS ───────────────────────────────────────────── */}
      <SectionReveal className="grid grid-cols-1 gap-8 border-t border-border/40 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-12">
        <div className="h-fit space-y-3 text-left sm:space-y-4 lg:sticky lg:top-24 lg:col-span-4">
          <span className="block font-manrope text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary">
            // Life Inside UNDS
          </span>
          <h2 className="font-garamond text-2xl font-light tracking-tight text-text-primary sm:text-3xl">
            What we do
          </h2>
          <p className="font-manrope text-sm leading-relaxed text-text-muted">
            Every week brings new ideas to explore, new arguments to refine, and
            new opportunities to grow. From your first practice debate to
            national competitions, every activity is designed to help you think
            more clearly, speak more confidently, and learn alongside a
            community that challenges and supports you.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-left sm:gap-4 lg:col-span-8 lg:gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 border p-3 sm:gap-4 sm:p-4"
            >
              <span className="pt-0.5 font-manrope text-xs font-bold text-primary">
                0{idx + 1} //
              </span>
              <div>
                <h4 className="mb-1 font-garamond text-base font-bold text-text-primary sm:text-lg">
                  {pillar.title}
                </h4>
                <p className="font-manrope text-[13px] leading-relaxed text-text-secondary sm:text-sm">
                  {pillar.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* ─── 4. BECOME PART OF THE STORY ────────────────────────────────────── */}
      <SectionReveal className="mx-auto max-w-3xl space-y-4 border-t border-border/40 pt-14 text-center sm:space-y-6 sm:pt-20">
        <h2 className="font-garamond text-3xl font-light tracking-tight text-text-primary sm:text-4xl">
          Become Part of the Story
        </h2>
        <p className="mx-auto max-w-xl font-manrope text-sm leading-relaxed text-text-secondary">
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
