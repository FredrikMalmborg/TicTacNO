import React, { useEffect } from "react";
import { useState } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Col, ColProps } from "react-native-easy-grid";
import TicTacText from "../../text/Text";

export type TCellState = 0 | 1 | 2 | 3;

interface ICellProps extends ColProps {
  state: TCellState;
}

interface ICellStyles {
  container: StyleProp<ViewStyle>;
  cell: StyleProp<ViewStyle>;
  0: StyleProp<ViewStyle>;
  1: StyleProp<ViewStyle>;
  2: StyleProp<ViewStyle>;
  3: StyleProp<ViewStyle>;
}

const Cell = ({ state, ...props }: ICellProps) => {
  const [cellState, setCellState] = useState<TCellState>(state);
  const style: ICellStyles = StyleSheet.create({
    container: {
      width: 60,
      height: 60,
    },
    cell: {
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "FredokaOne_400Regular",
      margin: 4,
      borderRadius: 10,
      borderWidth: 3,
      minWidth: 20,
      minHeight: 20,
      shadowOpacity: 1,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowRadius: 0,
    },
    0: {
      opacity: 0.33,
      elevation: 0,
      borderWidth: 0,
    },
    1: {
      borderColor: "#c1c1c1",
      backgroundColor: "#fff",
      shadowColor: "#c1c1c1",
    },
    2: {
      borderColor: "#BB2832",
      backgroundColor: "#fa5457",
      shadowColor: "#BB2832",
    },
    3: {
      borderColor: "#0B797D",
      backgroundColor: "#03D2DB",
      shadowColor: "#0B797D",
    },
  });

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => cellState === 1 && setCellState(3)}
    >
      <Col style={[style.cell, style[cellState]]} {...props}>
        <TicTacText centered color="#fff">
          {(cellState === 2 && "X") || (cellState === 3 && "O")}
        </TicTacText>
      </Col>
    </TouchableOpacity>
  );
};

export default Cell;
