import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Background from "./components/background";
import Pages from "./pages/pages";

export default function App() {
  return (
    <View style={style.appContainer}>
      <Pages />
      <Background width="100%" height="100%" />
      <StatusBar style="dark" />
    </View>
  );
}

const style: { appContainer: StyleProp<ViewStyle> } = StyleSheet.create({
  appContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});
