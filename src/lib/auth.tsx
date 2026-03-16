import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "./types";
import { upsertUser } from "./db";

interface TelegramWebApp {
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
  expand: () => void;
  ready: () => void;
  requestFullscreen?: () => void;
  enableClosingConfirmation?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  isVerticalSwipesEnabled: boolean;
  isFullscreen?: boolean;
  version?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

interface AuthContextValue {
  user: User;
  isAuthenticated: boolean;
  isPro: boolean;
  setIsPro: (v: boolean) => void;
  logout: () => void;
}

const MOCK_USER: User = {
  id: "dev_user",
  name: "Developer",
  username: "dev",
  isPro: false,
};

function getTelegramUser(): User | null {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!tgUser) return null;
  return {
    id: String(tgUser.id),
    name: [tgUser.first_name, tgUser.last_name].filter(Boolean).join(" "),
    username: tgUser.username,
    photoUrl: tgUser.photo_url,
    isPro: false,
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => getTelegramUser() || MOCK_USER);
  const [isPro, setIsProState] = useState(() => {
    return localStorage.getItem("vibelingo_pro") === "true";
  });

  const setIsPro = (v: boolean) => {
    setIsProState(v);
    localStorage.setItem("vibelingo_pro", String(v));
  };

  useEffect(() => {
    const tgUser = getTelegramUser();
    if (tgUser) {
      setUser(tgUser);
      // Ensure user exists in database
      void upsertUser({
        id: tgUser.id,
        name: tgUser.name,
        username: tgUser.username,
        photoUrl: tgUser.photoUrl,
      });
    } else {
      // Ensure mock/dev user exists in database
      void upsertUser({
        id: MOCK_USER.id,
        name: MOCK_USER.name,
        username: MOCK_USER.username,
      });
    }

    // Handle Stripe payment success redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setIsPro(true);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const logout = () => {
    setUser(MOCK_USER);
    setIsPro(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: { ...user, isPro },
        isAuthenticated: user.id !== MOCK_USER.id || user === MOCK_USER,
        isPro,
        setIsPro,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
