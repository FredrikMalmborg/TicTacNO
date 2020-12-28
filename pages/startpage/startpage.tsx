import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Logotype from "../../components/logotype";

interface IStyles {
  container: StyleProp<ViewStyle>;
}

const StartPage = () => {
  return (
    <View style={style.container}>
      <Logotype width="90%" height="33%" />
    </View>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    width: "100%",
    height: "100%",
  },
});

export default StartPage;
