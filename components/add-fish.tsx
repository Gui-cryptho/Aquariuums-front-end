"use client";

import React, { useState } from "react";

interface AddFishProps {
  onAdd: (data: {
    name: string;
    species: "goldfish" | "bluefish" | "greenfish" | "orangefish";
    dob: string;
    imageUrl: string;
  }) => void;
}

export function AddFish({ onAdd }: AddFishProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<
    "goldfish" | "bluefish" | "greenfish" | "orangefish"
  >("goldfish");
  const [dob, setDob] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const reset = () => {
    setName("");
    setSpecies("goldfish");
    setDob("");
    setImageUrl("");
  };

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name) return;
    onAdd({ name, species, dob, imageUrl });
    reset();
    setOpen(false);
  };

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Adicionar peixe"
        className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-cyan-600"
      >
        +
      </button>

      {/* Modal / panel */}
      {open && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <form
            onSubmit={submit}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 w-full max-w-md text-white z-50"
          >
            <h3 className="text-lg font-semibold mb-3">Adicionar Peixe</h3>

            <label className="block mb-2 text-sm">
              <span className="text-white/80">Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                required
              />
            </label>

            <label className="block mb-2 text-sm">
              <span className="text-white/80">Espécie</span>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as any)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              >
                <option value="goldfish">Goldfish</option>
                <option value="bluefish">Bluefish</option>
                <option value="greenfish">Greenfish</option>
                <option value="orangefish">Orangefish</option>
              </select>
            </label>

            <label className="block mb-2 text-sm">
              <span className="text-white/80">Data de Nascimento</span>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </label>

            <label className="block mb-4 text-sm">
              <span className="text-white/80">URL da Imagem</span>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600"
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border border-white/10"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
