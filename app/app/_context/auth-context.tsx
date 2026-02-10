"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { login, logout } from "../_functions/backend";
import { useRouter } from "next/dist/client/components/navigation";

interface User {
  id: string;
  email: string;
  stripe?: {
    customerId: string;
  };
  terms: boolean;
  marketing: boolean;
  hasOwnPassword: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: (redirectUrl?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  hasOwnPassword?: boolean;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/accounts/me`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logoutHandler = useCallback(
    async (redirectUrl?: string) => {
      try {
        await logout();
        setUser(null);
        return router.push(redirectUrl || "/");
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const loginHandler = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    if (!email || !email.includes("@")) {
      setIsLoading(false);
      return;
    }
    if (!password) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await login(email, password);
      if (res.user) {
        setUser(res.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null && user.email !== undefined,
    logout: logoutHandler,
    login: loginHandler,
    refreshUser,
    hasOwnPassword: user?.hasOwnPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
