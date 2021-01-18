import React, { memo } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Col, ColProps } from "react-native-easy-grid";
import TicTacText from "../../text/Text";
import colors from "../../../constants/colors";

export type TCellState = 0 | 1 | 2 | 3 | 4;
export type TCellPos = { y: number; x: number };

interface ICellProps extends ColProps {
  state: TCellState;
  pos: TCellPos;
  click: ({ y, x }: TCellPos, state: TCellState) => void;
}

interface ICellStyles {
  container: StyleProp<ViewStyle>;
  cell: StyleProp<ViewStyle>;
  1: StyleProp<ViewStyle>;
  2: StyleProp<ViewStyle>;
  3: StyleProp<ViewStyle>;
  4: StyleProp<ViewStyle>;
}

const Cell = ({ state, pos, ...props }: ICellProps) => {
  const style: ICellStyles = StyleSheet.create({
    container: {
      width: 40,
      height: 40,
    },
    cell: {
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "FredokaOne_400Regular",
      margin: 1,
      borderRadius: 5,
      borderWidth: 0,
      minWidth: 20,
      minHeight: 20,
      shadowOpacity: 1,
      shadowOffset: {
        width: -2,
        height: 2,
      },
      shadowRadius: 0,
    },
    1: {
      opacity: 0.33,
      elevation: 0,
      borderWidth: 0,
    },
    2: {
      borderColor: "#c1c1c1",
      shadowColor: "#c1c1c1",
      backgroundColor: "#fff",
    },
    3: {
      borderColor: colors.red.dark,
      shadowColor: colors.red.dark,
      backgroundColor: colors.red.light,
    },
    4: {
      borderColor: colors.teal.dark,
      shadowColor: colors.teal.dark,
      backgroundColor: colors.teal.light,
    },
  });

  const clickedCell = (state: TCellState) => {
    props.click(pos, state);
  };

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => state === 2 && clickedCell(3)}
    >
      <Col style={[style.cell, state !== 0 && style[state]]} {...props}>
        {/* <TicTacText centered color="#fff" size="sm" label={(state === 3 && "X") || (state === 4 && "O") || ""} /> */}
        <TicTacText
          centered
          color="#000"
          size={10}
          label={`${pos.y}:${pos.x}`}
        />
      </Col>
    </TouchableOpacity>
  );
};

export default memo(Cell);
