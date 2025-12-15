import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./(navigation)/RootNavigator";
import { AuthProvider } from "./(context)/AppContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

