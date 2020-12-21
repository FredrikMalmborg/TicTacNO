import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface IStyleManager {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

interface IProps {
  dark: boolean;
}

export default function App({ ...props }) {
  const dark = false;

  return (
    <View style={styles({ ...props, dark }).container}>
      <Text style={styles({ ...props, dark }).text}>
        Open up App.tsx to start working on your game!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create(
  (props: IProps): IStyleManager => ({
    container: {
      flex: 1,
      backgroundColor: `${props.dark ? "#000" : "#FFF"}`,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: `${props.dark ? "#FFF" : "#000"}`,
    },
  })
);
