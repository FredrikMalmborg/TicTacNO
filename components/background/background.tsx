import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Gradient from "./gradient";
import BackgroundText from "./background-text";

interface IStyleProps {
  backgroundContainer: StyleProp<ViewStyle>;
  backgroundText: StyleProp<ViewStyle>;
}

const Background = () => {
  const styles: IStyleProps = StyleSheet.create({
    backgroundContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    backgroundText: {
      position: "absolute",
      width: "100%",
    },
  });

  return (
    <View style={styles.backgroundContainer}>
      <BackgroundText
        width="100%"
        height="10%"
        preserveAspectRatio="xMidYMid slice"
        style={styles.backgroundText}
      />
      <Gradient width="100%" height="100%" />
    </View>
  );
};

export default Background;
