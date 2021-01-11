import React from "react";
import { View } from "react-native";
import TicTacText from "../../components/text/Text";

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TicTacText color="white" size="sm">
        Loading user...
      </TicTacText>
    </View>
  );
};

export default SplashScreen;
