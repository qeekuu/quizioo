import React, { createContext, useContext, useEffect, useState } from "react";
import * as Network from "expo-network";

type NetworkState = {
  isOnline: boolean;
};

const NetworkContext = createContext<NetworkState | null>(null);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (mounted) setIsOnline(!!state.isConnected);
      } catch {
        if (mounted) setIsOnline(false);
      }
    };

    check();
    const id = setInterval(check, 2000); // sprawdza co 2 sekundy

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error("useNetwork must be used inside NetworkProvider");
  return ctx;
}

