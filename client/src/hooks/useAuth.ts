import { trpc } from "@/lib/trpc";
import { useCallback } from "react";

export interface User {
  id: number;
  openId: string;
  name: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export function useAuth() {
  const { data: user, isLoading, refetch } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const login = useCallback(() => {
    // Redirect to OAuth login
    const currentUrl = window.location.href;
    window.location.href = `/api/auth/login?redirect=${encodeURIComponent(currentUrl)}`;
  }, []);

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
    window.location.reload();
  }, [logoutMutation]);

  return {
    user: user as User | null | undefined,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refetch,
  };
}
