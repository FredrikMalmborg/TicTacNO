import React, { memo } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  View,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Svg, { Path, Circle } from "react-native-svg";
import TicTacText from "../../../components/text/Text";
import colors from "../../../constants/colors";

import Cell from "../../../components/game/cell/cell"

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  roomData: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  condition?: string;
  player1: { id: string | null; displayName: string } | null;
  player2: { id: string | null; displayName: string } | null;
  rid?: string;
  destroyRoom: () => void;
  leaveRoom: () => void;
  startGame: () => void;
}

const PreGameRoom = ({
  condition,
  player1,
  player2,
  rid,
  destroyRoom,
  leaveRoom,
  startGame,
}: Props) => {
  const gameIsReady: boolean =
    player1 && player1 !== null && player2 && player2 !== null ? true : false;

  const gameStatus: string = gameIsReady
    ? "Game is ready"
    : "Game is not ready";

  const hostOrJoin =
    condition === "HOST" || condition === "RECON-HOST" ? "HOST" : "JOIN";

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          {condition && (
            <TicTacText
              title
              label={hostOrJoin === "HOST" ? "Your room" : "Joined room"}
              centered
              size="md"
            />
          )}
        </Row>
        <Row size={4} style={[style.section, style.roomData]}>
          <View style={style.content}>
            <TicTacText title label={`Room ID:`} centered size="sm" />
            {rid && <TicTacText title label={rid} centered size={70} />}
          </View>
          <View style={style.content}>
            <TicTacText title label="Players:" centered size="sm" />
            {player1 && player1 !== null && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Cell
                  zoomLevel={0}
                  state={3}
                  player={3}
                  pos={{ y: 0, x: 0 }}
                />
                <TicTacText
                  style={{ width: "auto" }}
                  title
                  color={colors.red.light}
                  label={`  ${player1.displayName}`}
                  centered
                  size={30}
                />
              </View>
            )}
            {player2 && player2 !== null && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Cell
                  zoomLevel={0}
                  state={4}
                  player={3}
                  pos={{ y: 0, x: 0 }}
                />
                <TicTacText
                  style={{ width: "auto" }}
                  title
                  color={colors.teal.light}
                  label={` ${player2.displayName}`}
                  centered
                  size={30}
                />
              </View>

            )}
          </View>
          <View style={style.content}>
            <TicTacText title label={gameStatus} centered size="sm" />
            {condition && hostOrJoin === "HOST" && (
              <TicTacText
                label="Start game"
                size={40}
                centered
                button={{
                  onClick: startGame,
                  bgColor: colors.teal,
                  form: "square",
                  disabled: !gameIsReady,
                }}
              />
            )}
          </View>
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
          {condition && (
            <TicTacText
              label={hostOrJoin === "HOST" ? "Cancel room" : "Leave room"}
              size="sm"
              centered
              button={{
                onClick: hostOrJoin === "HOST" ? destroyRoom : leaveRoom,
                bgColor: colors.red,
                form: "square",
              }}
            />
          )}
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F220",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  roomData: {
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
  },
  top: {
    padding: 50,
  },
  bottom: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

export default memo(PreGameRoom);
