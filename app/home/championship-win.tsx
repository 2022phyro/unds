"use client";

import CHAMPIONSHIP_WINS from "./data/championship-wins.json";
import { CloudinaryImage } from "@/components/cl-image";
import { Trophy } from "lucide-react";

const ROTATIONS = [
  "lg:rotate-1 lg:group-hover:-rotate-2",
  "lg:-rotate-1 lg:group-hover:rotate-2",
  "lg:rotate-2 lg:group-hover:-rotate-2",
  "lg:-rotate-2 lg:group-hover:rotate-2",
];

export function ChampionshipWins() {
  if (!CHAMPIONSHIP_WINS?.length) return null;

  return (
    <div className="space-y-16 sm:space-y-20 flex flex-col gap-20 lg:space-y-32">
{CHAMPIONSHIP_WINS.map((tournament, idx) => {
  const reverse = idx % 2 !== 0;

  return (
    <article
      key={idx}
      className={`group grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      } ${
        idx > 0
          ? "border-t border-primary/50   pt-12 sm:pt-14 lg:border-none lg:pt-0"
          : ""
      }`}
    >
            {/* ===========================
                TEXT
            ============================ */}
            <div className="lg:col-span-7 flex flex-col gap-2 sm:gap-3 lg:gap-4">
              <div className="flex items-center gap-3 font-playfair text-[14px] sm:text-xs tracking-[0.25em] uppercase text-primary font-bold">
                <span>{tournament.year}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{tournament.circuit}</span>
              </div>

              <h3 className="mt-3 font-garamond text-2xl sm:text-3xl lg:text-5xl leading-none text-text-primary">
                {tournament.tournamentName}
              </h3>

              {/* Achievement Cards */}
              <div className="mt-5 sm:mt-6 lg:mt-8 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {tournament.titles.map((title, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 sm:gap-4 rounded-none border border-border bg-surface px-4 py-3 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
                  >
                    {/* <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Trophy className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                    </div> */}
                    <span className="font-manrope text-[13px] sm:text-sm font-semibold text-text-primary leading-snug">
                      {title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ===========================
                IMAGE
            ============================ */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className={`relative w-full max-w-sm sm:max-w-md transition-all duration-500 ${ROTATIONS[idx % ROTATIONS.length]}`}
              >
                {/* Tape — desktop only */}
                <div className="hidden lg:block absolute -top-3 left-10 h-5 w-16 rotate-[-8deg] bg-primary/35 z-30" />
                <div className="hidden lg:block absolute -top-2 right-12 h-5 w-12 rotate-[6deg] bg-primary/20 z-30" />

                {/* Paper behind — desktop only */}
                <div className="hidden lg:block absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-sm border border-border bg-surface" />

                {/* Main card */}
                <div className="relative rounded-sm border border-border bg-surface p-2.5 sm:p-3 shadow-xl">
                  <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-sm">
                    <CloudinaryImage
                      src={tournament.imageUrl}
                      alt={tournament.tournamentName}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between text-[11px] sm:text-xs italic text-text-secondary font-garamond">
                    <span>{tournament.circuit}</span>
                    <span className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {tournament.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}