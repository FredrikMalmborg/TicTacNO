import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import TicTacText from "../../components/text/Text";
import { StackParamlist } from "../page-navigation/PageNavigator";

import { Pages } from "../pages";
import JoinRoom from "./join-room-modal";

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist>;
}

const PlayPage = ({ navigation }: Props) => {
  const [modal, setModal] = useState<boolean>(false);

  //Place page on top of stack
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "GamePage" }],
  });
  const navigateBack = () => navigation.goBack();
  // const navigateToGame = () => {
  //   navigation.navigate(Pages.Game);
  //   navigation.dispatch(resetAction);
  // };
  const navigateToHostRoom = () =>
    navigation.navigate(Pages.GamePage, { condition: "HOST" });

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
            button={{ onClick: () => setModal(!modal) }}
          />
          <TicTacText
            title
            label="host"
            size="md"
            button={{ onClick: navigateToHostRoom }}
          />
          <TicTacText title label="matchmaking" size="md" />
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
          <TicTacText
            label="back"
            size="sm"
            button={{ onClick: navigateBack }}
            color="white"
          />
          <TicTacText label="help" size="sm" color="white" />
        </Row>
      </Grid>
      <JoinRoom
        modalVisible={modal}
        setVisible={setModal}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

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

export default PlayPage;
