import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface UserInfo {
  name: string;
  email: string;
  initials: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "scentlore-auth";
const USER_KEY = "scentlore-user";

function getInitialAuth(): { isAuthenticated: boolean; user: UserInfo | null } {
  if (typeof window === "undefined") return { isAuthenticated: false, user: null };
  try {
    const stored = window.localStorage.getItem(AUTH_KEY);
    const userStored = window.localStorage.getItem(USER_KEY);
    return {
      isAuthenticated: stored === "true",
      user: userStored ? JSON.parse(userStored) : null,
    };
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = getInitialAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(initial.isAuthenticated);
  const [user, setUser] = useState<UserInfo | null>(initial.user);

  useEffect(() => {
    try {
      window.localStorage.setItem(AUTH_KEY, String(isAuthenticated));
    } catch {
      // ignore storage errors
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(USER_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [user]);

  const login = (userInfo: UserInfo) => {
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      window.localStorage.removeItem(AUTH_KEY);
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(AUTH_KEY, "false");
    } catch {
      // ignore storage errors
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
