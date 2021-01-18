import React from "react";
import { View } from "react-native";
import TicTacText from "../../components/text/Text";

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TicTacText label="Loading user..." color="white" size="sm" />
    </View>
  );
};

export default SplashScreen;
