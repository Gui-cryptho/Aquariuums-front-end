"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function FabAuth() {
  const router = useRouter();
  const [open, setOpen] = useState<null | "login" | "cadastro">(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submitLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name || !password) {
      setMessage("Preencha nome e senha.");
      return;
    }
    setMessage(`Entrando...`);
    setTimeout(() => {
      setMessage(null);
      setOpen(null);
      router.push("/");
    }, 700);
  };

  const submitCadastro = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name || !email || !password) {
      setMessage("Preencha todos os campos.");
      return;
    }
    setMessage("Criando conta...");
    setTimeout(() => {
      setMessage(null);
      setOpen(null);
      router.push("/login");
    }, 900);
  };

  return (
    <div>
      {/* two small stacked FABs */}
      <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-3">
        <button
          onClick={() => setOpen("login")}
          className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg hover:bg-indigo-600"
          title="Login"
        >
          🔒
        </button>
        <button
          onClick={() => setOpen("cadastro")}
          className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600"
          title="Cadastro"
        >
          ✍️
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(null)}
          />

          <form
            onSubmit={open === "login" ? submitLogin : submitCadastro}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 w-full max-w-md text-white z-50"
          >
            <h3 className="text-lg font-semibold mb-3">
              {open === "login" ? "Entrar" : "Cadastro"}
            </h3>

            <label className="block mb-2 text-sm">
              <span className="text-white/80">Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </label>

            {open === "cadastro" && (
              <label className="block mb-2 text-sm">
                <span className="text-white/80">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                />
              </label>
            )}

            <label className="block mb-4 text-sm">
              <span className="text-white/80">Senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600"
              >
                {open === "login" ? "Entrar" : "Cadastrar"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="px-4 py-2 rounded border border-white/10"
              >
                Cancelar
              </button>
            </div>

            {message && <p className="mt-3 text-sm text-white/90">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
