"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-4 sm:right-6 lg:right-8 z-40 grid h-11 w-11 place-items-center rounded-md border border-primary shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:text-primary ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-4.5 w-4.5" />
    </button>
  );
}