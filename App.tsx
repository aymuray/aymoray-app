import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./src/config/AssetsConfig";
import "./src/config/FoundationConfig";

import useCachedResources from "./src/hooks/useCachedResources";
import RootStack from "./src/nav/RootStack";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootStack />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
