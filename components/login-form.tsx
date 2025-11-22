"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import type { LoginFormData } from "@/types/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"


export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const router = useRouter(); // 👈 necessário para redirect

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;

    const data: LoginFormData = {
      email: (form.email as any).value,
      password: (form.password as any).value,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    setLoading(false);

    if (!json.success) {
      setError("Credenciais inválidas");
      return;
    }

    // Salva o usuário no contexto
    login(json.user);

    // 👇 REDIRECIONA PARA O DASHBOARD
    router.push("/dashboard");
  } ''
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  {/* Apple */}
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" type="button">
                  {/* Google */}
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" type="button">
                  {/* Meta */}
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="underline underline-offset-2 text-blue-600"
                >
                  Sign up
                </button>
              </FieldDescription>

            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
