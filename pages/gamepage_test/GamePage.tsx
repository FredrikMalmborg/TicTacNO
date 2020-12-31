import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Board from "../../components/game/board/board";

interface IStyles {
  viewContainer: StyleProp<ViewStyle>;
}

const GamePage = () => {

  const board: TCellState[][] = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];

  const style: IStyles = StyleSheet.create({
    viewContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={[style.viewContainer]}>
      <Board board={board} />
    </View>
  );
};

export default GamePage;
