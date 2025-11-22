"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: (form.name as any).value,
      email: (form.email as any).value,
      password: (form.password as any).value,
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    setLoading(false);

    if (!json.success) {
      setError(json.message || "Erro ao criar usuário");
      return;
    }

    // 👈 Depois de cadastrar, volta para LOGIN
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
      <Input name="name" placeholder="Seu nome" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Senha" required />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
