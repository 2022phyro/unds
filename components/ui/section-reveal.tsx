"use client";

import { ReactNode, CSSProperties, useState, useEffect, useRef } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // Time in milliseconds after entering viewport
};

export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once it reveals, we can stop observing this element
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      {
        // Triggers when 10% of the section is visible in the viewport
        threshold: 0.5,
        // Optional: Adds a bottom margin so it triggers slightly before hitting the screen edge
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const style: CSSProperties = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div
      ref={sectionRef}
      className={`${isIntersecting ? "reveal-in" : "opacity-0"} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}