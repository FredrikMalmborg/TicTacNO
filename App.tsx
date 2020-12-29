import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Background from "./components/background/background";
import Pages from "./pages/pages";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";

export default function App() {
  const [fontsLoaded /*, error */] = useFonts({ FredokaOne_400Regular });

  return (
    <>
      {fontsLoaded && (
        <View style={style.appContainer}>
          <Pages />
          <Background />
          <StatusBar style="dark" />
        </View>
      )}
    </>
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
