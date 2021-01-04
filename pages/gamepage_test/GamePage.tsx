import React from "react";
import { StyleProp, ViewStyle, SafeAreaView, Dimensions } from "react-native";
import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";
import { TCellState } from "../../components/game/cell/cell";

interface IStyles {
  boardContainer: StyleProp<ViewStyle>;
  // gameContainer: StyleProp<ViewStyle>;
}

const GamePage = () => {
  const windowSize = Dimensions.get("screen");

  // const board: TCellState[][] = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ];

  const board: TCellState[][] = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PanCamera windowSize={windowSize}>
        <Board board={[...board]} />
      </PanCamera>
    </SafeAreaView>
  );
};

export default GamePage;
