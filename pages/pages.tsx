import React from "react";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import GamePage from "./gamepage_test/GamePage";
import StartPage from "./startpage/startpage";

const Pages = () => {
  return (
    <View style={style.pages}>
      {/* <StartPage /> */}
      <GamePage />
    </View>
  );
};

const style: { pages: StyleProp<ViewStyle> } = StyleSheet.create({
  pages: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
});

export default Pages;
