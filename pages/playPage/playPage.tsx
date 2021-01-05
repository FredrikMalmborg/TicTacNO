import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import { StackParamlist } from "../PageNavigator";

import { Pages } from "../pages";

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "PlayPage">;
}

const PlayPage = ({ navigation }: Props) => {
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
    top: {
      padding: 50,
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });

  const navigateToStart = () => navigation.navigate(Pages.Start);
  const navigateToGame = () => navigation.navigate(Pages.Game);

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          <TicTacText title label="play" size="lg" />
        </Row>
        <Row size={4} style={style.section}>
          <TicTacText
            title
            label="join"
            size="md"
            button={{ onClick: navigateToGame }}
          />
          <TicTacText title label="host" size="md" />
          <TicTacText title label="matchmaking" size="md" />
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
          <TicTacText
            label="back"
            size="sm"
            button={{ onClick: navigateToStart }}
            color="white"
          />
          <TicTacText label="help" size="sm" color="white" />
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default PlayPage;
