"use client";

import { useEffect, useRef, useState } from "react";
import { Fish } from "./fish";
import { AquariumBubbles } from "./aquarium-bubbles";
import { AddFish } from "./add-fish";
import { FabAuth } from "./fab-auth";
import { getPeixes, criarPeixe, deletarPeixe } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

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
  // Remover peixe
  async function handleRemoveFish(id: string) {
    await deletarPeixe(id);
    setFish((prev) => prev.filter((f) => f.id !== id));
  }
  const [fish, setFish] = useState<FishState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const { token } = useAuth();

  // Mapeia nomes de espécies do backend para tipos válidos
  const normalizeType = (especie: string): FishState["type"] => {
    const allowed = ["goldfish", "bluefish", "greenfish", "orangefish"];

    if (allowed.includes(especie)) {
      return especie as FishState["type"];
    }

    return "goldfish";
  };

  // ===========================
  // Carregar peixes da API
  // ===========================
  useEffect(() => {
    async function load() {
      if (!token) return;
      try {
        const data = await getPeixes();
        const width = containerRef.current?.clientWidth ?? 600;
        const height = containerRef.current?.clientHeight ?? 400;
        // Sempre atualiza o array de peixes ao logar/trocar de conta
        setFish(
          data.map((p: any) => ({
            id: p.id,
            name: p.nome,
            dob: p.dataNascimento,
            imageUrl: p.url,
            type: normalizeType(p.especie),
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 2,
            direction: Math.random() > 0.5 ? "left" : "right",
          }))
        );
      } catch (err) {
        console.error("Erro ao carregar peixes", err);
      }
    }
    load();
  }, [token]);

  // ===========================
  // Animação dos peixes
  // ===========================
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setFish((prev) =>
        prev.map((f) => {
          let newX = f.x + f.vx;
          let newY = f.y + f.vy;
          let newVx = f.vx;
          let newVy = f.vy;
          let newDirection = f.direction;
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
          if (newY < 0) newVy = Math.abs(newVy);
          if (newY > height - 60) newVy = -Math.abs(newVy);
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
      if (running) animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [fish]);

  // ===========================
  // Adicionar novo peixe
  // ===========================
  async function handleAddFish({
    name,
    species,
    dob,
    imageUrl,
  }: {
    name?: string;
    species: string;
    dob?: string;
    imageUrl?: string;
  }) {
    const created = await criarPeixe({
      nome: name ?? null,
      especie: species,
      dataNascimento: dob ?? null,
      tamanhoAquario: 60,
      url: imageUrl ?? null,
    });

    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const newFish: FishState = {
      id: created.id,
      name,
      dob,
      imageUrl,
      type: species as any,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 4, // velocidade horizontal maior
      vy: (Math.random() - 0.5) * 2, // velocidade vertical maior
      direction: Math.random() > 0.5 ? "left" : "right",
    };

    setFish((prev) => [...prev, newFish]);
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-white">
        <p className="text-lg mb-4">
          Faça login para ver e gerenciar seus peixes.
        </p>
        <FabAuth />
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-linear-to-b from-blue-400 to-blue-900 overflow-hidden"
    >
      <AquariumBubbles />
      {fish.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: f.x,
            top: f.y,
          }}
        >
          <Fish type={f.type} direction={f.direction} />
          <button
            onClick={() => handleRemoveFish(f.id)}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-700"
            title="Remover peixe"
          >
            ×
          </button>
        </div>
      ))}
      <AddFish onAdd={handleAddFish} />
      <FabAuth />
    </div>
  );
}
