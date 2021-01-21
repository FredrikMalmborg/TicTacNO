import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import RoomContext, { INITIAL_ROOM } from "../../contexts/room/room-context";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { StackParamlist } from "../page-navigation/PageNavigator";
import GameInfoModal from "./game-info-modal";
import GameBoard from "./game-board";
import PreGameRoom from "./pre-game-room/pre-game-room";

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
  route: RouteProp<StackParamlist, "GamePage">;
}

const GamePage = ({ navigation, route }: Props) => {
  const { condition } = route.params;
  const { roomState, roomContext } = useContext(RoomContext);
  const [modal, setModal] = useState<boolean>(false);

  // CREATE ROOM ON HOST OR DESTROY ON HOST DEMOUNT
  useEffect(() => {
    if (condition === "HOST") {
      roomContext.hostRoom();
    }
    return () => {
      if (condition === "HOST" || condition === "RECON-HOST") {
        // console.log("DESTROY", room.gameStarted);
        roomContext.destroyRoom();
      }
    };
  }, []);

  // START GAME
  useEffect(() => {
    if (roomState.gameStarted) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
        // navigation.dispatch(resetAction);
      }, 2000);
    }
  }, [roomState.gameStarted]);

  // LEAVE ROOM IF DESTROYED
  useEffect(() => {
    console.log("local room: ", roomState);

    if (condition === "JOIN" && !roomState.gameStarted) {
      if (roomState === INITIAL_ROOM) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
          navigation.goBack();
        }, 2000);
      }
    }
  }, [roomState]);

  //Place page on top of stack
  //   const resetAction = CommonActions.reset({
  //     index: 0,
  //     routes: [{ name: "GamePage" }],
  //   });

  // LEAVE FOR JOINERS
  const leaveRoom = () => {
    roomContext.leaveRoom();
    navigation.goBack();
  };

  // LEAVE FOR HOSTERS
  const destroyRoom = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.container}>
      <>
        {roomState.gameStarted ? (
          <GameBoard />
        ) : (
          <PreGameRoom
            condition={condition}
            rid={roomState.rid}
            player1={roomState.player1}
            player2={roomState.player2}
            destroyRoom={destroyRoom}
            leaveRoom={leaveRoom}
            startGame={roomContext.startGame}
          />
        )}
      </>
      <GameInfoModal
        modalVisible={modal}
        label={!roomState.gameStarted ? "Game was cancelled" : "Loading game"}
        setVisible={setModal}
      />
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

export default GamePage;
