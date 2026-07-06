import Link from "next/link";
import { HeroCacophony } from "./hero-cacophony";
import {
  METRICS,
  TESTIMONIALS,
  UPCOMING_EVENTS,
  WHAT_WE_DO,
} from "./home-data";
import { SectionReveal } from "../../components/ui/section-reveal";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { ChamberGazette } from "./chamber-gazette";
import { HomeContactBlock } from "./contact-us";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-accent selection:text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12 md:py-12">
        <SectionReveal className="border-b border-border pb-16 pt-2 [animation-delay:0ms]">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 flex flex-col gap-4 justify-center">
              <span className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-text-secondary">
                University of Nigeria Debating Society // Meet the Spartans
              </span>
              <h1 className="max-w-3xl text-[clamp(2.8rem,7vw,5.8rem)] font-black leading-[0.96] tracking-tight text-text-primary">
                <span className="block font-heading">Welcome to
                  <span className="text-accent"> UNDS</span>
                </span>
                <span className="block font-garamond text-[clamp(1.7rem,4.2vw,2.95rem)] font-normal leading-[1.04]">
                  Home of intellectual discourse
                </span>
              </h1>
              <p className="mt-6 max-w-xl font-garamond text-base leading-relaxed text-text-secondary sm:text-lg md:text-xl">
                Welcome to the premier forum for rigorous critique, competitive
                advocacy, and intellectual conflict. We forge thinkers who
                command rooms.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <BookmarkButton variant="filled">
                  <Link className="m-2 font-semibold font-manrope uppercase" href="/join">Let your voice be heard today</Link>
                </BookmarkButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroCacophony />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="border-b border-border py-16 [animation-delay:140ms]">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Pillars of Advocacy
            </span>
            <h2 className="mt-1 text-3xl font-bold text-text-primary md:text-4xl">
              Our Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x divide-border">
            {WHAT_WE_DO.map((pillar, index) => (
              <div
                key={pillar.index}
                className={`flex flex-col ${index === 0 ? "md:pr-8" : index === 1 ? "md:px-8" : "md:pl-8"}`}
              >
                <span className="mb-2 text-xs font-bold text-accent">
                  {pillar.index}
                </span>
                <h3 className="mb-2 text-xl font-bold text-text-primary">
                  {pillar.title}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="border-b border-border py-12 [animation-delay:240ms]">
          <div className="rounded-md border border-border bg-surface-muted/70 px-6 py-10 shadow-sm sm:px-8">
            <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4 lg:gap-4">
              {METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col items-center">
                  <span className="text-3xl font-black tracking-tight text-primary sm:text-4xl md:text-5xl">
                    {metric.value}
                  </span>
                  <span className="mt-1 text-sm text-text-secondary sm:text-base">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="border-b border-border py-16 [animation-delay:340ms]">
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </SectionReveal>
        <SectionReveal className="py-16 [animation-delay:440ms]">
          <ChamberGazette />
        </SectionReveal>
        <SectionReveal className="border-t border-border py-16 [animation-delay:540ms]">
          <HomeContactBlock />
        </SectionReveal>
      </div>
    </div>
  );
}
