import React, { useEffect } from "react";
import { SafeAreaView, Dimensions, BackHandler } from "react-native";
import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";

const GameBoard = () => {
  const windowSize = Dimensions.get("screen");
  const handleBackButton = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PanCamera windowSize={windowSize}>
        <Board />
      </PanCamera>
    </SafeAreaView>
  );
};

export default GameBoard;
