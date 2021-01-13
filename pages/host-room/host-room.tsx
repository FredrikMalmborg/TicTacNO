import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

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
  player1: string | null;
  player2: string | null;
  gameStarted: boolean;
}

const HostRoom = ({ navigation }: Props) => {
  const { user } = useContext(AuthContext);
  const allRoomsRef = firebase.database().ref("rooms");
  const roomId = Math.random().toString(36).substr(2, 5);
  const room: IRoom = {
    rid: roomId,
    open: false,
    player1: user.userToken,
    player2: null,
    gameStarted: false,
  };

  useEffect(() => {
    const newRoomRef = allRoomsRef.push();
    newRoomRef.set(room);

    return () => {
      newRoomRef
        .remove()
        .then(() => console.log("Successful removal"))
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

  //   const navigateToStart = () => navigation.navigate(Pages.Start);
  const cancelRoom = () => {
    // const roomRef = firebase.database().ref(`rooms/${roomId}`);
    // roomRef
    //   .remove()
    //   .then(() => console.log("Successful removal!"))
    //   .catch((e) => console.log(e));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={1} style={[style.section, style.top]}>
          <TicTacText title label="Hosting room" centered size="md" />
        </Row>
        <Row size={4} style={style.section}>
          <TicTacText title label={`Room ID:`} centered size="sm" />
          <TicTacText title label={roomId} centered size="md" />
          <TicTacText title label="Users:" centered size="sm" />
          <TicTacText title label="Game is not ready" centered size="sm" />
        </Row>
        <Row size={1} style={[style.section, style.bottom]}>
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
