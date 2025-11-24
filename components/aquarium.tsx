"use client";

import { useEffect, useRef, useState } from "react";
import { Fish } from "./fish";
import { AquariumBubbles } from "./aquarium-bubbles";
import { AddFish } from "./add-fish";
import { FabAuth } from "./fab-auth";

interface FishState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "goldfish" | "bluefish" | "greenfish" | "orangefish";
  direction: "left" | "right";
  name?: string;
  dob?: string;
  imageUrl?: string;
}

export function Aquarium() {
  const [fish, setFish] = useState<FishState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize fish
  useEffect(() => {
    const initialFish: FishState[] = [
      {
        id: "1",
        x: 100,
        y: 150,
        vx: 2,
        vy: 0.5,
        type: "goldfish",
        direction: "right",
      },
      {
        id: "2",
        x: 300,
        y: 300,
        vx: -1.5,
        vy: 0.3,
        type: "bluefish",
        direction: "left",
      },
      {
        id: "3",
        x: 200,
        y: 250,
        vx: 1.8,
        vy: -0.4,
        type: "greenfish",
        direction: "right",
      },
      {
        id: "4",
        x: 400,
        y: 100,
        vx: -2,
        vy: 0.6,
        type: "orangefish",
        direction: "left",
      },
      {
        id: "5",
        x: 150,
        y: 400,
        vx: 1.2,
        vy: -0.2,
        type: "bluefish",
        direction: "right",
      },
    ];
    setFish(initialFish);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      setFish((prevFish) =>
        prevFish.map((f) => {
          let newX = f.x + f.vx;
          let newY = f.y + f.vy;
          let newVx = f.vx;
          let newVy = f.vy;
          let newDirection = f.direction;

          // Bounce off walls
          if (newX < 0) {
            newX = 0;
            newVx = Math.abs(newVx);
            newDirection = "right";
          }
          if (newX > width - 60) {
            newX = width - 60;
            newVx = -Math.abs(newVx);
            newDirection = "left";
          }

          // Bounce off top and bottom
          if (newY < 0) {
            newY = 0;
            newVy = Math.abs(newVy);
          }
          if (newY > height - 60) {
            newY = height - 60;
            newVy = -Math.abs(newVy);
          }

          // Occasionally change direction randomly
          if (Math.random() < 0.005) {
            newVy = (Math.random() - 0.5) * 1.5;
          }

          return {
            ...f,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            direction: newDirection,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-linear-to-b from-blue-400 to-blue-900 overflow-hidden"
    >
      {/* Water linear effect */}
      <div className="absolute inset-0 bg-linear-to-b from-cyan-300/20 via-blue-500/10 to-transparent pointer-events-none" />

      {/* Sand bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-amber-900/60 to-amber-700/20 pointer-events-none" />

      {/* Bubbles */}
      <AquariumBubbles />

      {/* Fish */}
      {fish.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}px`,
            top: `${f.y}px`,
            transition: "none",
          }}
        >
          <Fish type={f.type} direction={f.direction} />
        </div>
      ))}

      {/* Aquarium glass effect */}
      <div className="absolute inset-0 border-8 border-slate-300/20 pointer-events-none rounded-lg" />
      <AddFish
        onAdd={({ name, species, dob, imageUrl }) => {
          const width = containerRef.current?.clientWidth ?? 600;
          const height = containerRef.current?.clientHeight ?? 400;
          const newFish: FishState = {
            id: Math.random().toString(36).slice(2, 9),
            x: Math.max(10, Math.min(width - 60, Math.random() * width)),
            y: Math.max(10, Math.min(height - 60, Math.random() * height)),
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 1.2,
            type: species,
            direction: Math.random() > 0.5 ? "left" : "right",
            name,
            dob,
            imageUrl,
          };

          setFish((prev) => [...prev, newFish]);
        }}
      />
      <FabAuth />
    </div>
  );
}
