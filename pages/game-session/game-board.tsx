import React, { memo, useContext, useEffect, useState } from "react";
import { SafeAreaView, Dimensions, BackHandler } from "react-native";
import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";
import AuthContext from "../../contexts/auth/auth-context";
import RoomContext from "../../contexts/room/room-context";

const GameBoard = () => {
  const windowSize = Dimensions.get("screen");
  const {
    room: { player1, player2, playerTurn, gameBoard, availableCells },
  } = useContext(RoomContext);
  const {
    user: { userToken },
  } = useContext(AuthContext);
  const handleBackButton = () => {
    return true;
  };
  const [yourTurn, setYourTurn] = useState<boolean>(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  });

  useEffect(() => {
    if (
      yourPlayer() !== null &&
      playerTurn !== null &&
      yourPlayer() === playerTurn
    ) {
      setYourTurn(true);
    } else {
      setYourTurn(false);
    }
  }, [playerTurn]);

  const yourPlayer = () =>
    userToken && player1 && player2 && userToken === player1.id
      ? player1
      : player2;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PanCamera windowSize={windowSize}>
        {gameBoard && availableCells && (
          <Board
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
