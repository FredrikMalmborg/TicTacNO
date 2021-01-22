import React, { memo, useContext, useEffect, useState } from "react";
import { SafeAreaView, Dimensions, BackHandler } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";
import AuthContext from "../../contexts/auth/auth-context";
import RoomContext from "../../contexts/room/room-context";
import TicTacText from "../../components/text/Text";

export type ZoomLevel = 0 | 1 | 2;

const GameBoard = () => {
  const windowSize = Dimensions.get("screen");
  const {
    roomState: { player1, player2, playerTurn, gameBoard, availableCells },
  } = useContext(RoomContext);
  const {
    user: { userToken },
  } = useContext(AuthContext);
  const handleBackButton = () => {
    return true;
  };
  const [yourTurn, setYourTurn] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(1);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  });

  useEffect(() => {
    if (
      yourPlayer() !== null &&
      playerTurn !== null &&
      yourPlayer()?.id === playerTurn.id
    ) {
      console.log("TURN TRUE");
      setYourTurn(true);
    } else {
      console.log("TURN FALSE");
      setYourTurn(false);
    }
  }, [playerTurn]);

  const yourPlayer = () =>
    userToken && player1 && player2 && userToken === player1.id
      ? player1
      : player2;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableHighlight onPress={() => {
        setZoomLevel(zoomLevel === 0 ? 1 : zoomLevel === 1 ? 2 : zoomLevel === 2 ? 0 : zoomLevel)
      }}>
        <TicTacText label="Zoom" />

      </TouchableHighlight>
      <PanCamera windowSize={windowSize}>
        {gameBoard && availableCells && (
          <Board
            zoomLevel={zoomLevel}
            gameBoard={gameBoard}
            yourTurn={yourTurn}
            playerState={yourPlayer()?.cellId}
            aCells={availableCells}
          />
        )}
      </PanCamera>
    </SafeAreaView>
  );
};

export default memo(GameBoard);
