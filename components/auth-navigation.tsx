// components/auth-navigation.tsx
import Link from "next/link";

export function AuthNavigation() {
  return (
    <div className="absolute top-6 right-6 flex gap-4">
      <Link 
        href="/signup" 
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Criar conta
      </Link>
      <Link 
        href="/login" 
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Entrar
      </Link>
    </div>
  );
}