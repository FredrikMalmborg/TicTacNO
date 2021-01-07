import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text, StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";

import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import { StackParamlist } from "../page-navigation/PageNavigator";

import { Pages } from "../pages";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;

  animate: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "LoginPage">;
}

const LoginPage = ({ navigation }: Props) => {
  const style: IStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "#F220",
    },
    section: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    animate: {},
  });


  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={2} style={[style.section]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={3} style={style.section}>
          <TicTacText title label="play" size={60} />
          <TicTacText title label="back" size={60} />
          {/* <TicTacText title label="profile" size={60} />
          <TicTacText title label="play" size={60} /> */}
          {/* <TicTacText label="email" />
          <TicTacText label="google" />
          <TicTacText label="facebook" /> */}
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default LoginPage;
