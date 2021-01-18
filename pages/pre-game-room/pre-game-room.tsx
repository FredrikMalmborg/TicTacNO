import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
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
import RoomContext, { INITIAL_ROOM } from "../../contexts/room/room-context";
import { RouteProp } from "@react-navigation/native";
import { StackParamlist } from "../page-navigation/PageNavigator";
import GameInfoModal from "./game-info-modal";

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
  route: RouteProp<StackParamlist, "PreGameRoom">;
}

const PreGameRoom = ({ navigation, route }: Props) => {
  const { condition } = route.params;
  const { room, roomContext } = useContext(RoomContext);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    console.log(condition);

    if (condition === "HOST") {
      roomContext.hostRoom();
    } else if (condition === "JOIN") {
    }
    return () => {
      console.log("ON DEMOUNT");

      if (condition === "HOST" || condition === "RECON-HOST") {
        console.log("DESTROY");
        
        roomContext.destroyRoom();
      }
    };
  }, []);

  useEffect(() => {
    if (condition === "JOIN") {
      if (room === INITIAL_ROOM) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
          navigation.goBack();
        }, 3000);
      }
    }
  }, [room]);

  // LEAVE FOR JOINERS
  const exitRoom = () => {
    roomContext.leaveRoom();
    navigation.goBack();
  };

  // LEAVE FOR HOSTERS
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

  const hostOrJoin =
    condition === "HOST" || condition === "RECON-HOST" ? "HOST" : "JOIN";

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          <TicTacText
            title
            label={hostOrJoin === "HOST" ? "Your room" : "Joined room"}
            centered
            size="md"
          />
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
            {hostOrJoin === "HOST" && (
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
            )}
          </View>
        </Row>
        <Row size={2} style={[style.section, style.bottom]}>
          <TicTacText
            label={hostOrJoin === "HOST" ? "Cancel room" : "Leave room"}
            size="sm"
            centered
            button={{
              onClick: hostOrJoin === "HOST" ? cancelRoom : exitRoom,
              bgColor: colors.red,
              form: "square",
            }}
          />
        </Row>
      </Grid>
      <GameInfoModal modalVisible={modal} setVisible={setModal} />
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

export default PreGameRoom;
