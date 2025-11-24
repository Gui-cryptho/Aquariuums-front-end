"use client";

import React, { useEffect, useState } from "react";

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  dx50: string;
  dx100: string;
}

export function AquariumBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const createBubble = () => {
      const newBubble: Bubble = {
        id: Math.random().toString(),
        x: Math.random() * 100,
        y: 100,
        size: Math.random() * 15 + 5,
        duration: Math.random() * 2 + 3,
        dx50: Math.random() > 0.5 ? "30px" : "-30px",
        dx100: Math.random() > 0.5 ? "50px" : "-50px",
      };

      setBubbles((prev) => [...prev, newBubble]);

      // Remove bubble after animation
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, newBubble.duration * 1000);
    };

    const interval = setInterval(createBubble, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => {
        const style: React.CSSProperties & Record<string, string> = {
          left: `${bubble.x}%`,
          bottom: `${bubble.y - 100}px`,
          width: `${bubble.size}px`,
          height: `${bubble.size}px`,
          animation: `rise ${bubble.duration}s ease-in forwards`,
        };

        // assign CSS custom properties per-bubble
        style["--dx50" as any] = bubble.dx50;
        style["--dx100" as any] = bubble.dx100;

        return (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-linear-to-br from-cyan-300/30 to-blue-300/20 border border-cyan-200/40"
            style={style}
          />
        );
      })}

      <style>{`
        @keyframes rise {
          0% {
            opacity: 0.6;
            transform: translateY(0) translateX(0);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-200px) translateX(var(--dx50, 0px));
          }
          100% {
            opacity: 0;
            transform: translateY(-400px) translateX(var(--dx100, 0px));
          }
        }
      `}</style>
    </div>
  );
}
