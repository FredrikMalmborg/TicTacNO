import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Logotype from "../../components/logotype";

interface IStyles {
  container: StyleProp<ViewStyle>;
}

const StartPage = () => {
  return (
    <View style={style.container}>
      <Logotype />
    </View>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    margin: "15%",
  },
});

export default StartPage;
