import { useState } from "react";
import { criarUsuario } from "@/lib/api";

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); // ← ADICIONADO
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const resultado = await criarUsuario({ nome, email, senha }); // ← SENHA AQUI
      setMensagem("Usuário criado com sucesso!");
      setNome("");
      setEmail("");
      setSenha(""); // ← LIMPAR SENHA
    } catch (err) {
      setMensagem("Erro ao criar usuário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white rounded shadow max-w-sm mx-auto"
    >
      <h2 className="text-lg font-bold">Cadastro de Usuário</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />

      {/* ← ADICIONADO INPUT DE SENHA */}
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      {mensagem && <div className="text-green-600 font-medium">{mensagem}</div>}
    </form>
  );
}
