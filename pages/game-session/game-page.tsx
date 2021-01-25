import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import RoomContext, { INITIAL_ROOM } from "../../contexts/room/room-context";
import { RouteProp } from "@react-navigation/native";
import { StackParamlist } from "../page-navigation/PageNavigator";
import GameInfoModal from "./game-info-modal";
import GameBoard from "./game-board";
import PreGameRoom from "./pre-game-room/pre-game-room";
import PostGameModal from "./post-game-modal";

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
  const [gameInfoModal, setGameInfoModal] = useState<boolean>(false);
  const [postGameModal, setPostGameModal] = useState<boolean>(true);

  // CREATE ROOM ON HOST OR DESTROY ON HOST DEMOUNT
  useEffect(() => {
    if (condition === "HOST") {
      roomContext.hostRoom();
    }
    return () => {
      if (condition === "HOST" || condition === "RECON-HOST") {
        roomContext.destroyRoom();
      }
    };
  }, []);

  // START GAME
  useEffect(() => {
    if (roomState.gameStarted) {
      setGameInfoModal(true);
      setTimeout(() => {
        setGameInfoModal(false);
        // navigation.dispatch(resetAction);
      }, 2000);
    }
  }, [roomState.gameStarted]);

  // LEAVE ROOM IF DESTROYED
  useEffect(() => {
    if (condition === "JOIN" && !roomState.gameStarted) {
      if (roomState === INITIAL_ROOM) {
        setGameInfoModal(true);
        setTimeout(() => {
          setGameInfoModal(false);
          navigation.goBack();
        }, 2000);
      }
    }
  }, [roomState]);

  useEffect(() => {
    if (roomState.gameOver) {
      setPostGameModal(true);
    } else {
      setPostGameModal(false);
    }
  }, [roomState.gameOver]);

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

  const hostOrJoin =
    condition === "HOST" || condition === "RECON-HOST" ? "HOST" : "JOIN";

  return (
    <SafeAreaView style={style.container}>
      <>
        {roomState.gameStarted ? (
          <GameBoard />
        ) : (
          <PreGameRoom
            condition={hostOrJoin}
            rid={roomState.rid}
            player1={roomState.player1}
            player2={roomState.player2}
            destroyRoom={destroyRoom}
            leaveRoom={leaveRoom}
            startGame={roomContext.startGame}
          />
        )}
      </>
      <PostGameModal
        modalVisible={postGameModal}
        setVisible={setPostGameModal}
        condition={hostOrJoin}
        leaveRoom={leaveRoom}
        destroyRoom={destroyRoom}
      />
      <GameInfoModal
        modalVisible={gameInfoModal}
        label={!roomState.gameStarted ? "Game was cancelled" : "Loading game"}
        setVisible={setGameInfoModal}
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
