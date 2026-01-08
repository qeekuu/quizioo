import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/app/(api)/client";
import type { User, LoginDTO, RegisterDTO } from "@/app/(api)/types";

type AuthState = {
  user: User | null;
  isReady: boolean;
};

type AuthContextType = {
  state: AuthState;
  login: (dto: LoginDTO) => Promise<User>;
  register: (dto: RegisterDTO) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const USER_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      try {
        const raw = await SecureStore.getItemAsync(USER_KEY);
        setUser(raw ? (JSON.parse(raw) as User) : null);
      } finally {
        setIsReady(true);
      }
    };
    boot();
  }, []);

  {/*
  const login = async (dto: LoginDTO) => {
    const u = await api.login(dto);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const register = async (dto: RegisterDTO) => {
    const u = await api.register(dto);
    // opcja: auto-login po rejestracji:
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(USER_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ state: { user, isReady }, login, register, logout }),
    [user, isReady]
  );
  */}
	const login = useCallback(async (dto: LoginDTO) => {
		const u = await api.login(dto);
		await SecureStore.setItemAsync(USER_KEY, JSON.stringify(u));
		setUser(u);
		return u;
	}, []);

	const register = useCallback(async(dto: RegisterDTO) => {
		const u = await api.register(dto);
		await SecureStore.setItemAsync(USER_KEY, JSON.stringify(u));
		setUser(u);
		return u;
	}, []);

	const logout = useCallback(async () => {
		await SecureStore.deleteItemAsync(USER_KEY);
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({ state: { user, isReady }, login, register, logout }),
		[user, isReady, login, register, logout]
	);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

