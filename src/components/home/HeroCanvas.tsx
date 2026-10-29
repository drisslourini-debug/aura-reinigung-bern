"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  cleaned: boolean;
  sparkleTimer: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create dust particles
    const particleCount = Math.min(80, Math.floor((width * height) / 12000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2, // gentle upward drift
        alpha: Math.random() * 0.4 + 0.2,
        cleaned: false,
        sparkleTimer: 0,
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient clean light aura around cursor
      if (mouse.x > -500) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        gradient.addColorStop(0, "rgba(0, 210, 255, 0.15)");
        gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.08)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with cursor (The Clean Sweep)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          p.cleaned = true;
          p.sparkleTimer = 1.0; // Trigger sparkle
          // Push away cleanly
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * 0.8;
          p.vy -= Math.sin(angle) * 0.8;
        }

        // Dampen velocity back to calm
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 - 0.015;

        // Draw particle: If cleaned/sparkling, draw as bright pure diamond glint
        if (p.sparkleTimer > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.fillStyle = `rgba(0, 210, 255, ${p.sparkleTimer})`;
          ctx.shadowColor = "#00D2FF";
          ctx.shadowBlur = 8;

          // Cross star glint
          const glintSize = p.size * (1 + p.sparkleTimer * 2.5);
          ctx.beginPath();
          ctx.moveTo(0, -glintSize);
          ctx.lineTo(glintSize * 0.25, 0);
          ctx.lineTo(0, glintSize);
          ctx.lineTo(-glintSize * 0.25, 0);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-glintSize, 0);
          ctx.lineTo(0, glintSize * 0.25);
          ctx.lineTo(glintSize, 0);
          ctx.lineTo(0, -glintSize * 0.25);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
          p.sparkleTimer -= 0.025;
        } else {
          // Normal ambient dust particle (soft grey-blue)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85"
      />
    </div>
  );
}
