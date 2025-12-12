"use client";
import { useAuth } from "@/hooks/use-auth";

export function LogoutButton() {
  const { token, logout } = useAuth();
  if (!token) return null;
  return (
    <button
      onClick={logout}
      className="ml-4 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
    >
      Sair
    </button>
  );
}
