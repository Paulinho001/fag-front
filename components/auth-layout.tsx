// components/auth-layout.tsx
interface AuthLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function AuthLayout({ children, maxWidth = "max-w-sm" }: AuthLayoutProps) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className={`w-full ${maxWidth}`}>
        {children}
      </div>
    </div>
  );
}