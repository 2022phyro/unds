"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconQuote } from "@tabler/icons-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  achievements: string;
};

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const previous = () =>
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  const next = () =>
    setActiveIndex((current) => (current + 1) % testimonials.length);

  return (
    <section
      className="w-full relative py-12"
      aria-label="Testimonials carousel"
    >
      {/* 1. Fixed Height Wrapper: Prevents layout jump */}
      <div className="relative w-full h-[450px] flex items-center justify-center overflow-visible">
        <div className="flex items-center justify-center w-full h-full relative">
          {testimonials.map((t, index) => {
            let offset = index - activeIndex;
            if (offset < -1) offset += testimonials.length;
            if (offset > 1) offset -= testimonials.length;

            const isActive = offset === 0;
            const isHidden = Math.abs(offset) > 1;

            return (
              <div
                key={index}
                onClick={() => !isActive && setActiveIndex(index)}
                className={`absolute w-[90%] sm:w-[450px] transition-all duration-500 ease-out cursor-pointer select-none
                  ${isActive ? "z-30 opacity-100 scale-100 blur-0" : "z-10 opacity-40 blur-[2px]"}
                  ${offset === -1 ? "-translate-x-[60%] sm:-translate-x-[110%]" : ""}
                  ${offset === 1 ? "translate-x-[60%] sm:translate-x-[110%]" : ""}
                  ${isHidden ? "opacity-0 scale-75 pointer-events-none" : ""}
                `}
              >
                {/* 2. Fixed height article with flex-col */}
                <article className="h-[400px] flex flex-col p-8 rounded-2xl border border-border bg-[var(--surface)] shadow-lg">
                  {/* Quote Section: flex-1 ensures it takes available space. line-clamp-6 cuts long text. */}
                  <div className="flex-1 overflow-hidden flex-col items-center justify-center">
                    <p className="font-manrope flex flex-col gap-3 items-start text-sm sm:text-medium italic leading-relaxed text-text-secondary line-clamp-[9]">
                      <IconQuote className="scale-x-[-1]" />
                      {t.quote}
                    </p>
                  </div>

                  {/* Footer Section: Locked to the bottom */}
                  <div className="mt-6 pt-6 border-t border-border/40 flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-accent/20"
                    />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-semibold text-text-primary text-sm truncate">
                        {t.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-text-muted truncate mb-1">
                        {t.role}
                      </p>

                      {/* Achievement Badge */}
                      {t.achievements && (
                        <div className="w-fit text-[10px] whitespace-pre-line font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 truncate max-w-full">
                          {t.achievements}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation - Always in same place */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={previous}
          className="p-2 border rounded-full hover:bg-surface"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 border rounded-full hover:bg-surface"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
