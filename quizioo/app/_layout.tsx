import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./(navigation)/RootNavigator";
import { AuthProvider } from "./(context)/AppContext";
import { NetworkProvider } from "./(context)/NetworkContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
		<NetworkProvider>
          <RootNavigator />
		</NetworkProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

