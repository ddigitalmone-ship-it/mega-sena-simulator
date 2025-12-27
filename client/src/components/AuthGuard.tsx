import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Lock, Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
  description?: string;
}

export default function AuthGuard({
  children,
  fallback,
  title = "Acesso Restrito",
  description = "Faça login para acessar esta funcionalidade e salvar seus jogos de forma segura.",
}: AuthGuardProps) {
  const { user, isLoading, isAuthenticated, login } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-200/50 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-indigo-600" />
          </div>
          <CardTitle className="text-xl text-indigo-900">{title}</CardTitle>
          <CardDescription className="text-indigo-600/80">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-2">
          <Button
            onClick={login}
            size="lg"
            className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
          >
            <LogIn className="h-5 w-5" />
            Entrar com sua conta
          </Button>
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Ao fazer login, você concorda com nossos{" "}
            <a href="/terms" className="text-indigo-600 hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}
