import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Background from "./components/background/background";
import Pages from "./pages/pages";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

export default function App() {
  const [fontsLoaded] = useFonts({ FredokaOne_400Regular });

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

  return (
    <View style={style.appContainer}>
      {fontsLoaded ? (
        <>
          <Pages />
          <Background />
          <StatusBar style="dark" />
        </>
      ) : (
        <AppLoading />
      )}
    </View>
  );
}
