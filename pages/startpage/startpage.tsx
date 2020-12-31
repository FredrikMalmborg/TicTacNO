import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import { StackParamlist } from "../PageNavigator";

import { Pages } from "../pages";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "StartPage">;
}

const StartPage = ({ navigation }: Props) => {
  const { container, section }: IStyles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      paddingTop: 16,
      width: "100%",
      height: "100%",
      backgroundColor: "#F220",
    },
    section: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  });

  const navigateToPlay = () => navigation.navigate(Pages.Play);
  // const navigateToProfile = () => navigation.navigate(Pages.Profile)

  return (
    <View style={container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={section}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={4} style={section}>
          <TicTacText
            title
            label="play"
            size="md"
            button={{ onClick: navigateToPlay }}
          />
          <TicTacText title label="profile" size="md" />
        </Row>
        <Row size={1} style={section}>
          <TicTacText label="back" size="sm" />
          <TicTacText label="about us" size="sm" />
        </Row>
      </Grid>
    </View>
  );
};

export default StartPage;
