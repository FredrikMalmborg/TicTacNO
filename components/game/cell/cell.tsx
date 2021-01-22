import React, { memo } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Col, ColProps } from "react-native-easy-grid";
import TicTacText from "../../text/Text";
import colors from "../../../constants/colors";
import { ZoomLevel } from "../../../pages/game-session/game-board";

export type TCellState = 0 | 1 | 2 | 3 | 4;
export type TCellPos = { y: number; x: number };

interface ICellProps extends ColProps {
  zoomLevel: ZoomLevel
  player: TCellState;
  state: TCellState;
  pos: TCellPos;
  click?: ({ y, x }: TCellPos, state: TCellState) => void;
}

interface ICellStyles {
  container: StyleProp<ViewStyle>;
  cell: StyleProp<ViewStyle>;
  1: StyleProp<ViewStyle>;
  2: StyleProp<ViewStyle>;
  3: StyleProp<ViewStyle>;
  4: StyleProp<ViewStyle>;
}

const Cell = ({ state, pos, zoomLevel, ...props }: ICellProps) => {
  const style: ICellStyles = StyleSheet.create({
    container: {
      width: (() => {
        switch (zoomLevel) {
          case 0: return 40
          case 1: return 60
          case 2: return 100
        }
      })(),
      height: (() => {
        switch (zoomLevel) {
          case 0: return 40
          case 1: return 60
          case 2: return 100
        }
      })(),
    },
    cell: {
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "FredokaOne_400Regular",
      margin: (() => {
        switch (zoomLevel) {
          case 0: return 2
          case 1: return 3
          case 2: return 4
        }
      })(),
      borderRadius: (() => {
        switch (zoomLevel) {
          case 0: return 5
          case 1: return 8
          case 2: return 11
        }
      })(),
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
    props.click ? props.click(pos, state) : null
  };
  const content = <Col style={[style.cell, state !== 0 && style[state]]} {...props}>
    <TicTacText centered color="#fff" size={(() => {
      switch (zoomLevel) {
        case 0: return 20
        case 1: return 40
        case 2: return 80
      }
    })()} label={(state === 3 && "X") || (state === 4 && "O") || ""} />
  </Col>

  return (
    props.click ?
      <TouchableOpacity
        style={style.container}
        onPress={() => state === 2 && clickedCell(props.player)}
      >
        {content}
      </TouchableOpacity>
      : <View
        style={style.container}>
        {content}
      </View>
  );
};

export default Cell;
