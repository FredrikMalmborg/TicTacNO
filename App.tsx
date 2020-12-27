import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Background from "./components/background";
import Pages from "./pages/pages";

export default function App() {
  return (
    <View>
      <Pages />
      <Background width="100%" height="100%" />
      {/* <StatusBar style="light" /> */}
    </View>
  );
}
