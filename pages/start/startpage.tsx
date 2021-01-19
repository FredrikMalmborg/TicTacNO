import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext, useEffect } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";

import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import RoomContext from "../../contexts/room/room-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

import { Pages } from "../pages";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;

  animate: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "StartPage">;
}

const StartPage = ({ navigation }: Props) => {
  const { user, authContext } = useContext(AuthContext);
  const { roomContext } = useContext(RoomContext);

  useEffect(() => {
    if (user.userToken !== null) {
      fetchGameAndReconnect();
    }
    // console.log(user);
  }, [user]);

  const fetchGameAndReconnect = useCallback(async () => {
    const ongoingGame = await roomContext.checkForOngoingGame();
    if (ongoingGame) {
      // Reconnect to room and navigate to room state (pre or ongoing)
      roomContext.reconnectToOngoing(ongoingGame.room);
      if (ongoingGame.host) {
        navigation.navigate(Pages.GamePage, { condition: "RECON-HOST" });
      } else {
        navigation.navigate(Pages.GamePage, { condition: "RECON-JOIN" });
      }
      // console.log("GAME: ", ongoingGame);
    }
  }, [user.userToken]);

  const navigateToPlay = () => navigation.navigate(Pages.Play);

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={2} style={[style.section]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={3} style={style.section}>
          <TicTacText
            title
            label="play"
            size="md"
            button={{ onClick: navigateToPlay }}
          />
          <TicTacText title label="profile" size="md" />
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
          <TicTacText
            label="Log out"
            size="sm"
            centered
            button={{
              onClick: () => authContext.signOut(),
              bgColor: colors.red,
              form: "square",
            }}
          />
          {/* <TicTacText label="About us" size="md" color="white" /> */}
        </Row>
      </Grid>
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
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  animate: {},
});

export default StartPage;
