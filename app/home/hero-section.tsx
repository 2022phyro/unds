"use client";

import Link from "next/link";
import { HeroFireflies } from "@/components/fireflies";

export default function HeroSection() {
  return (
    <section
      className="
      relative
      isolate
      overflow-hidden
      min-h-screen
      border-b border-border
      flex items-center
      bg-background
      "
    >
      <HeroFireflies />

      <div className="relative z-20 mx-auto max-w-7xl w-full px-6 sm:px-8 py-24 lg:py-32">
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-12 lg:gap-8">
          {/* Text Content Block */}
          <div className="max-w-3xl flex flex-col gap-3 lg:col-span-7">
            <h1
              className="
              mt-4 lg:mt-6
              font-heading
              font-semibold!
              leading-[0.95]
              tracking-tight
              text-5xl!
              text-text-primary
              "
            >
              University of Nigeria{" "}
              <span className="text-primary">Debating Society</span>
            </h1>

            <p
              className="
              mt-6 lg:mt-8
              max-w-2xl
              font-garamond
              text-2xl sm:text-3xl
              italic
              leading-tight
              text-text-primary
              "
            >
              Speak your mind
            </p>

            <p
              className="
              mt-4 lg:mt-6
              max-w-xl
              text-sm sm:text-base
              leading-relaxed sm:leading-8
              text-text-secondary
              "
            >
              Whether you're just discovering the world of opinions or preparing
              for your next medal, you'll find a community that welcomes
              thoughtful questions, celebrates spirited discussion, and helps
              you grow into a confident speaker, critical thinker, and
              principled leader. Here, every conversation is an opportunity to
              learn, challenge ideas, and discover your own voice.
            </p>

            <div className="mt-8 lg:mt-10 flex flex-wrap gap-6 items-center">
              <Link
                href="/join"
                className="
                btn btn-primary
                text-(--btn-primary-text)!
                h-14
                px-8
                text-sm
                font-medium
                tracking-[.16em]
                hover:scale-[1.02]
                active:scale-[.99]
                transition-transform
                flex items-center justify-center
                "
              >
                Register Today →
              </Link>

              <Link
                href="/about"
                className="
                inline-flex
                h-14
                btn btn-outline
                items-center
                px-4
                text-sm
                border
                text-(--btn-outline-text)!
                underline-offset-8
                hover:underline
                "
              >
                Explore Society
              </Link>
            </div>
          </div>

          {/* Media Presentation Block (Transformed to Landscape) */}
          <div className="w-full flex justify-center lg:col-span-5 lg:justify-end">
            <div
              className="
              relative
              w-full
              max-w-md
              lg:max-w-full
              rotate-[-2deg]
              lg:rotate-[-3deg]
              transition-transform
              duration-500
              hover:rotate-0
              "
            >
              {/* Washi tape pin strips */}
              <div className="absolute -top-3 left-10 w-14 h-5 bg-btn-accent/70 rotate-[-6deg] shadow-xs z-30" />
              <div className="absolute -top-2.5 right-12 w-12 h-5 bg-btn-accent/50 rotate-[8deg] shadow-xs z-30" />

              {/* Stacked background paper detail */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-[1.5deg] rounded-xs border border-border bg-surface shadow-xs" />

              {/* The Exhibition Frame */}
              <div className="relative rounded-xs border border-border bg-surface p-3 shadow-xl z-20">
                {/* Image Element Box forced into Landscape Aspect Mapping */}
                <div className="relative aspect-4/3 overflow-hidden rounded-[2px] bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                    alt="The UNDS Spartans"
                    className="h-full w-full object-cover"
                  />
                  {/* Duotone color-palette tinter overlay */}
                  <div className="absolute inset-0 bg-primary mix-blend-color opacity-[0.22] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Subtle Editorial Label */}  
                <p className="inline-flex flex-row items-center justify-center w-full mt-3 text-center gap-3 font-garamond italic text-xs sm:text-sm text-text-secondary">
                  The Spartans <span className="text-primary rounded-full h-1 w-1 bg-primary"></span> Est. 2011
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
