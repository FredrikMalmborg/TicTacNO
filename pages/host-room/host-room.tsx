import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  View,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import { StackParamlist } from "../page-navigation/PageNavigator";
import RoomContext from "../../contexts/room/room-context";

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  roomData: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist>;
}

const HostRoom = ({ navigation }: Props) => {
  const { room, roomContext } = useContext(RoomContext);

  useEffect(() => {
    roomContext.hostRoom();
    return () => roomContext.destroyRoom();
  }, []);

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

  const cancelRoom = () => {
    navigation.goBack();
  };

  const gameIsReady: boolean =
    room.player1 &&
    room.player1 !== null &&
    room.player2 &&
    room.player2 !== null
      ? true
      : false;
  const gameStatus: string = gameIsReady
    ? "Game is ready"
    : "Game is not ready";

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          <TicTacText title label="Your room" centered size="md" />
        </Row>
        <Row size={4} style={[style.section, style.roomData]}>
          {room && (
            <>
              <View style={style.content}>
                <TicTacText title label={`Room ID:`} centered size="sm" />
                {room.rid && (
                  <TicTacText title label={room.rid} centered size={40} />
                )}
              </View>
              <View style={style.content}>
                <TicTacText title label="Players:" centered size="sm" />
                {room.player1 && room.player1 !== null && (
                  <TicTacText
                    title
                    label={`1: ${room.player1.displayName}`}
                    centered
                    size={30}
                  />
                )}
                {room.player2 && room.player2 !== null && (
                  <TicTacText
                    title
                    label={`2: ${room.player2.displayName}`}
                    centered
                    size={30}
                  />
                )}
              </View>
            </>
          )}
          <View style={style.content}>
            <TicTacText title label={gameStatus} centered size="sm" />
            <TicTacText
              label="Start game"
              size={40}
              centered
              button={{
                onClick: cancelRoom,
                bgColor: colors.teal,
                form: "square",
                disabled: !gameIsReady,
              }}
            />
          </View>
        </Row>
        <Row size={2} style={[style.section, style.bottom]}>
          <TicTacText
            label="Cancel room"
            size="sm"
            centered
            button={{
              onClick: cancelRoom,
              bgColor: colors.red,
              form: "square",
            }}
          />
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

export default HostRoom;
