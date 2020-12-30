import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Cell, { TCellState } from "../../components/game/cell/cell";

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
      <Grid style={{flex: 0}}>
        {board.map((row, rowIndex) => (
          <Row style={{ height: 60 }} key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <Cell key={`cell-${rowIndex}/${colIndex}`} state={col} />
            ))}
          </Row>
        ))}
      </Grid>
    </View>
  );
};

export default GamePage;
