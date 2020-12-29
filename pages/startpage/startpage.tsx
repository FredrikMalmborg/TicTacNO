import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";

interface IStyles {
  container: StyleProp<ViewStyle>;
}

const StartPage = () => {
  return (
    <View style={style.container}>
      <Logotype width="90%" height="33%" />
      <TicTacText title label="play" size="md" />
      <TicTacText title label="profile" size="md" />
      {/* <TicTacText title label="play" size="sm" />
      <TicTacText title label="host" size="sm" />
      <TicTacText title label="join" size="sm" /> */}

      {/* <TicTacText title label="profile" size="sm" /> */}
      {/* <TicTacText title label="profile" size="lg" /> */}

      {/* <TicTacText label="profile" size="sm" />

      <TicTacText bread label="profile" size={10} />
      <TicTacText bread label="profile" size="sm" />
      <TicTacText bread label="profile" size="md" /> */}

      {/* <TicTacText size="sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </TicTacText>
      <TicTacText bread size={15}>
        {" "}
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </TicTacText> */}
    </View>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    width: "100%",
    height: "100%",
  },
});

export default StartPage;
