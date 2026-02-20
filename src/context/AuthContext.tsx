"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  LoginRequest,
  RegisterRequest,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  decodeJWT,
  isTokenExpired,
} from "@/libs/api";

interface User {
  access_token: string;
  user:{
    email: string;
    name: string;
    role: string;
    Applications?: unknown[];
  }
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<User | null>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    removeAuthToken();
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      const decoded = decodeJWT<User>(storedToken);
      if (decoded) {
        setUser(decoded);
      }
    } else if (storedToken) {
    
      removeAuthToken();
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (data: LoginRequest): Promise<User | null> => {
    const response = await apiLogin(data);
    const accessToken = response.access_token;
    setAuthToken(accessToken);
    setToken(accessToken);
    const decoded = decodeJWT<User>(accessToken);
    if (decoded) {
      setUser(decoded);
    }
    return decoded;
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    await apiRegister(data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}