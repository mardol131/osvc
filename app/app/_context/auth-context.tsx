"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  login,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../_functions/backend";
import { useRouter } from "next/dist/client/components/navigation";
import { set } from "date-fns";
import { AxiosError, AxiosResponse } from "axios";

interface User {
  id: string;
  email: string;
  stripe?: {
    customerId: string;
  };
  terms: boolean;
  marketing: boolean;
  pushSubscription?: (
    | string
    | {
        id: string;
        endpoint: string;
        [key: string]: any;
      }
  )[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: (redirectUrl?: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  login: (
    email: string,
    password: string,
  ) => Promise<{
    message:
      | "success"
      | "error"
      | "no-match"
      | "email-missing"
      | "password-missing";
  }>;
  resetPassword: (
    token: string,
    newPassword: string,
  ) => Promise<{ message: "success" | "error" }>;
  requestPasswordResetEmail: (
    email: string,
    redirectUrl: string,
  ) => Promise<{ message: "success" | "error" }>;
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

  const loginHandler = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{
      message:
        | "success"
        | "error"
        | "no-match"
        | "email-missing"
        | "password-missing";
    }> => {
      setIsLoading(true);
      if (!email || !email.includes("@")) {
        setIsLoading(false);
        return { message: "email-missing" };
      }
      if (!password) {
        setIsLoading(false);
        return { message: "password-missing" };
      }
      try {
        const response = await login(email, password);
        if (response.data.user) {
          setUser({
            id: response.data.user.id,
            email: response.data.user.email,
            stripe: response.data.user.stripe,
            terms: response.data.user.terms,
            marketing: response.data.user.marketing,
          });
          setIsLoading(false);
          return { message: "success" };
        } else {
          setUser(null);
          setIsLoading(false);
          return { message: "no-match" };
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Login error:", error);
          if (error.response && error.response.status === 401) {
            setUser(null);
            setIsLoading(false);
            return { message: "no-match" };
          }
        }
        console.log("Login error:", error);
        setUser(null);
        setIsLoading(false);
        return { message: "error" };
      }
    },
    [],
  );

  const resetPasswordHandler = useCallback(
    async (
      token: string,
      newPassword: string,
    ): Promise<{ message: "success" | "error" }> => {
      setIsLoading(true);
      try {
        await resetPassword({
          token: token,
          password: newPassword,
        });
        setIsLoading(false);
        return { message: "success" };
      } catch (error) {
        setUser(null);
        setIsLoading(false);
        return { message: "error" };
      }
    },
    [],
  );

  const requestPasswordResetHandler = async (
    email: string,
    redirectUrl: string,
  ): Promise<{ message: "success" | "error" }> => {
    setIsLoading(true);
    try {
      await requestPasswordReset({ email, redirectUrl });
      setIsLoading(false);
      return { message: "success" };
    } catch (err) {
      setIsLoading(false);
      return { message: "error" };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null && user.email !== undefined,
    logout: logoutHandler,
    refreshUser,
    login: loginHandler,
    resetPassword: resetPasswordHandler,
    requestPasswordResetEmail: requestPasswordResetHandler,
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
