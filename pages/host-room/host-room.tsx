import { StackNavigationProp } from "@react-navigation/stack";
import { firebase } from "../../constants/firebase";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext, { INITIAL_STATE } from "../../contexts/auth/auth-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

const allRoomsRef = firebase.database().ref("rooms");
const newRoomRef = allRoomsRef.push();

interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "PlayPage">;
}

interface IRoom {
  rid: string;
  open: boolean;
  player1: { id: string | null; displayName: string } | null;
  player2: { id: string | null; displayName: string } | null;
  gameStarted: boolean;
}

const HostRoom = ({ navigation }: Props) => {
  const roomId = Math.random().toString(36).substr(2, 5);
  const INITIAL_ROOM: IRoom = {
    rid: roomId,
    open: false,
    player1: null,
    player2: null,
    gameStarted: false,
  };
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState<IRoom>({
    ...INITIAL_ROOM,
    player1: { id: user.userToken, displayName: "anon" },
  });

  useEffect(() => {
    // setup roomlistener to sync data
    const onValueChange = newRoomRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setRoom(data);
    });

    try {
      // get player username
      firebase
        .database()
        .ref(`users/${user.userToken}`)
        .once("value")
        .then((snapshot) => {
          const username =
            (snapshot.val() && snapshot.val().username) || "Anonymous";
          newRoomRef.set({
            ...INITIAL_ROOM,
            player1: { id: user.userToken, displayName: username },
          });
        });
    } catch (e) {
      console.log(e);
    }

    return () => {
      // Remove listener on demount
      newRoomRef.off("value", onValueChange);
      // Remove room on demount
      newRoomRef
        .remove()
        // .then(() => console.log("Successful removal"))
        .catch((e) => console.log(e));
    };
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
    top: {
      padding: 50,
    },
    bottom: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });

  const cancelRoom = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          <TicTacText title label="Hosting room" centered size="md" />
        </Row>
        <Row size={4} style={style.section}>
          {room && (
            <>
              <TicTacText title label={`Room ID:`} centered size="sm" />
              {room.rid && (
                <TicTacText title label={room.rid} centered size="md" />
              )}
              <TicTacText title label="Players:" centered size="sm" />
              {room.player1 && (
                <TicTacText
                  title
                  label={`1: ${room.player1.displayName}`}
                  centered
                  size="sm"
                />
              )}
              {room.player2 && (
                <TicTacText
                  title
                  label={`2: ${room.player2.displayName}`}
                  centered
                  size="sm"
                />
              )}
            </>
          )}
          <TicTacText title label="Game is not ready" centered size="sm" />
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
