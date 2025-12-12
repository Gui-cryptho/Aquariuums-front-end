// lib/api.ts
const API_URL = "http://localhost:8000";

// ---------------------- USUÁRIOS ----------------------
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
}

export async function criarUsuario(data: {
  nome: string;
  email: string;
  senha: string;
}) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar usuário");
  return res.json();
}

export async function deletarUsuario(id: string) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar");
  return res.json();
}

// ---------------------- PEIXES ----------------------
export async function getPeixes() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`${API_URL}/peixes`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Erro ao buscar peixes");
  return res.json();
}

export async function criarPeixe(data: {
  nome?: string | null;
  especie: string;
  dataNascimento?: string | null;
  tamanhoAquario?: number;
  url?: string | null;
}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`${API_URL}/peixes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    console.error("Erro ao criar peixe:", erro);
    throw new Error(erro.error || "Erro ao criar peixe");
  }

  return res.json();
}

export async function deletarPeixe(id: string) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`${API_URL}/peixes/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Erro ao deletar peixe");
  // Se status 204, não tente ler json
  if (res.status === 204) return;
  return res.json();
}
