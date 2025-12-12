"use client";

import React, { useState } from "react";
import { criarUsuario } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function FabAuth() {
  const router = useRouter();
  const { login, logout } = useAuth();
  const [open, setOpen] = useState<null | "login" | "cadastro">(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const submitLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !password) {
      setMessage("Preencha email e senha.");
      return;
    }
    setMessage("Entrando...");
    const ok = await login(email, password);
    if (ok) {
      setMessage("Login realizado!");
      setTimeout(() => {
        setMessage(null);
        setOpen(null);
        setName("");
        setEmail("");
        setPassword("");
        router.push("/");
      }, 900);
    } else {
      setMessage("Email ou senha inválidos.");
    }
  };

  const submitCadastro = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name || !email || !password) {
      setMessage("Preencha todos os campos.");
      return;
    }

    setMessage("Criando conta...");

    criarUsuario({
      nome: name,
      email,
      senha: password,
    })
      .then((resultado) => {
        console.log("Resposta da API:", resultado);

        if (resultado && resultado.id) {
          setMessage("Usuário criado com sucesso!");

          setTimeout(() => {
            setMessage(null);
            setOpen(null);
            setName("");
            setEmail("");
            setPassword("");
          }, 1200);
        } else {
          setMessage(
            "Erro ao criar usuário: " +
              (resultado?.message || "Resposta inesperada.")
          );
        }
      })
      .catch((err) => {
        console.error("Erro ao criar usuário:", err);
        setMessage("Erro ao criar usuário.");
      });
  };

  return (
    <div>
      {/* Botões flutuantes */}
      <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-3">
        {/* Se não estiver logado, mostra login e cadastro */}
        {!useAuth().token && (
          <>
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
          </>
        )}
        {/* Se estiver logado, mostra apenas botão de logout */}
        {useAuth().token && (
          <button
            onClick={() => {
              logout();
              setOpen(null);
            }}
            className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600"
            title="Sair"
          >
            ⎋
          </button>
        )}
      </div>

      {/* Modal */}
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

            {/* Email (login e cadastro) */}
            <label className="block mb-2 text-sm">
              <span className="text-white/80">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </label>
            {/* Nome apenas no cadastro */}
            {open === "cadastro" && (
              <label className="block mb-2 text-sm">
                <span className="text-white/80">Nome</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                />
              </label>
            )}

            {/* Senha */}
            <label className="block mb-4 text-sm">
              <span className="text-white/80">Senha</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
              />
            </label>

            {/* Botões */}
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

            {/* Mensagens */}
            {message && <p className="mt-3 text-sm text-white/90">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
