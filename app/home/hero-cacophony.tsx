"use client";

import { useEffect, useRef } from "react";
import HERO_CACOPHONY from "./data/hero.json";

export function HeroCacophony() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || canvas.width;
      canvas.height = canvas.parentElement?.clientHeight || canvas.height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = 150;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 0.5,
          // Low-velocity drift adjustments for organic floating feel
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.45,
          alpha: Math.random() * 0.5 + 0.1,
          alphaSpeed: (Math.random() - 0.5) * 0.005,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update physics positions
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        // Bounce/Wrap boundaries gently
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.alpha <= 0.05 || p.alpha >= 0.65) p.alphaSpeed *= -1;

        // Enforce smooth constraints
        p.alpha = Math.max(0.05, Math.min(0.65, p.alpha));

        // Draw debater dust aura particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Emits a glowing emerald/lavender-adjacent thematic tone
        ctx.fillStyle = `rgba(74, 117, 89, ${p.alpha})`;
        ctx.shadowBlur = p.radius * 2;
        ctx.shadowColor = "rgba(40, 90, 60, 0.4)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="relative w-full h-135 sm:h-150 md:h-160 overflow-hidden rounded-2xl p-4"
      aria-hidden="true"
    >
      {/* Dynamic Swirling Background Field */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none w-full h-full mix-blend-multiply opacity-85 dark:mix-blend-screen" 
      />

      {/* Radiant Focus Vignette over particles */}
      <div className="absolute inset-0 " />

      {/* The Debate Arena Layout */}
      <div className="relative w-full h-full z-10">
        {HERO_CACOPHONY.map((bubble) => {
          const isLeftAligned = bubble.align === "left";
          const customColorStyle = bubble.style?.color ? { color: bubble.style.color } : undefined;

          return (
            <article
              key={bubble.id}
              style={bubble.style}
              className={`
                /* Unified Absolute Positioning System */
                absolute rounded-2xl border px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-md 
                transition-all duration-500 will-change-transform
                
                /* Callout Tail Alignment: dynamic mirroring */
                after:absolute after:-bottom-1 after:h-2.5 after:w-2.5 after:rotate-45 after:border-b after:border-r after:border-inherit after:bg-inherit after:content-['']
                ${isLeftAligned ? "rounded-bl-xs after:left-6" : "rounded-br-xs after:right-6"}
                
                ${bubble.bubbleClass}
              `}
            >
              <span 
                style={customColorStyle}
                className="mb-0.5 block text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.24em] opacity-85"
              >
                {bubble.label}
              </span>
              <p 
                style={customColorStyle}
                className={`text-xs sm:text-sm leading-snug ${bubble.fontClass}`}
              >
                {bubble.text}
              </p>
                            <span 
                style={customColorStyle}
                className="mb-0.5 block text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.24em] opacity-85 text-right"
              >
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}