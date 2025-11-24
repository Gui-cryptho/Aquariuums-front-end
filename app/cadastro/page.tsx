"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Aquarium } from "../../components/aquarium";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Email inválido.");
      return;
    }

    setMessage("Criando conta...");

    setTimeout(() => {
      setMessage(null);
      router.push("/login");
    }, 900);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Aquarium />
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-5" />

      <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg text-white"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center">Cadastro</h1>

          <label className="block mb-3">
            <span className="text-sm text-white/80">Nome</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Seu nome"
              autoComplete="name"
            />
          </label>

          <label className="block mb-3">
            <span className="text-sm text-white/80">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="seu@exemplo.com"
              autoComplete="email"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm text-white/80">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Senha"
              autoComplete="new-password"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors font-medium"
          >
            Criar conta
          </button>

          {message && (
            <p className="mt-3 text-center text-sm text-white/90">{message}</p>
          )}

          <p className="mt-4 text-center text-xs text-white/60">
            Já tem conta?{" "}
            <Link href="/login" className="text-cyan-300 underline">
              Entrar
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
