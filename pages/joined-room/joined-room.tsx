import { StackNavigationProp } from "@react-navigation/stack";
// import { firebase } from "../../constants/firebase";
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
// import AuthContext, { INITIAL_STATE } from "../../contexts/auth/auth-context";
import { StackParamlist } from "../page-navigation/PageNavigator";
import GameInfoModal from "./game-info-modal";
// import useRoomStatus from "../../hooks/useRoomStatus";
// import useRoomActions from "../../hooks/useRoomActions";

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  roomData: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  roomKey: string;
  navigation: StackNavigationProp<StackParamlist>;
}

const JoinedRoom = ({ navigation }: Props) => {
  const { room, roomContext } = useContext(RoomContext);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (room === INITIAL_ROOM) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        navigation.goBack();
      }, 3000);
    }
  }, [room]);

  const exitRoom = () => {
    roomContext.leaveRoom();
    navigation.goBack();
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

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={2} style={[style.section, style.top]}>
          <TicTacText title label="Joined room" centered size="md" />
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
        </Row>
        <Row size={2} style={[style.section, style.bottom]}>
          <TicTacText
            label="Leave room"
            size="sm"
            centered
            button={{
              onClick: exitRoom,
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

export default JoinedRoom;
