"use client";

import { useEffect, useRef } from "react";

export function HeroFireflies() {
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
      const container = canvas.closest(".hero-container-root");
      canvas.width = container?.clientWidth || window.innerWidth;
      canvas.height = container?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Scaled up count slightly since the region is now much wider
      const count = 100;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.2 + 0.6,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.4 + 0.1,
          alphaSpeed: (Math.random() - 0.5) * 0.004,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.alpha <= 0.05 || p.alpha >= 0.55) p.alphaSpeed *= -1;

        p.alpha = Math.max(0.05, Math.min(0.55, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Emits a soft, elegant thematic glow matching your palette
        ctx.fillStyle = `rgba(74, 117, 89, ${p.alpha})`;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = "rgba(11, 43, 22, 0.3)";
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
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none w-full h-full mix-blend-multiply opacity-75 dark:mix-blend-screen z-0" 
    />
  );
}