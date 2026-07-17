"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  achievements: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const previous = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section 
      className="w-full overflow-hidden relative"
      aria-roledescription="carousel"
      aria-label="Testimonials focus carousel"
    >
      {/* --- WIDESCREEN SLIDER TRACK --- */}
      <div className="relative w-full h-100 flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-full relative">
          {testimonials.map((testimonial, index) => {
            // Calculate relative offset position from the active center index
            let offset = index - activeIndex;
            
            // Loop calculations over the array bounds cleanly
            if (offset < -1) offset += testimonials.length;
            if (offset > 1) offset -= testimonials.length;

            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = !isActive && !isLeft && !isRight;

            return (
              <div
                key={index}
                onClick={() => !isActive && setActiveIndex(index)}
                className={`absolute w-[90%] sm:w-[500px] transition-all duration-500 ease-out cursor-pointer select-none
                  ${isActive ? "z-30 opacity-100 scale-100 blur-0 pointer-events-auto" : ""}
                  ${isLeft ? "z-10 opacity-40 -translate-x-[60%] sm:-translate-x-[75%] scale-85 blur-[2px]" : ""}
                  ${isRight ? "z-10 opacity-40 translate-x-[60%] sm:translate-x-[75%] scale-85 blur-[2px]" : ""}
                  ${isHidden ? "opacity-0 scale-75 pointer-events-none z-0" : ""}
                `}
              >
                {/* Book Themed Card Frame */}
                <article className="surface border border-y-border border-r-border border-l-border/60 p-6 sm:p-8 rounded-r-2xl rounded-l-xs shadow-md relative min-h-[240px] flex flex-col justify-between before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-border/20 before:rounded-l-xs bg-[var(--surface)]">
                  <p className="font-manrope text-medium  italic leading-relaxed text-text-secondary">
                    “{testimonial.quote}”
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-20 w-20 rounded-full object-cover ring-1 ring-accent/35"
                    />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{testimonial.role}</p>
                      <p className="text-lg text-bold leading-tight whitespace-pre-line font-garamond text-text-muted">{testimonial.achievements}</p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- UTILITY BUTTON INTERFACES & TRACK INDICATORS --- */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-muted text-text-primary transition-colors hover:bg-surface rounded-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-muted text-text-primary transition-colors hover:bg-surface rounded-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Flat Minimal Progression Metrics */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-text-muted/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}