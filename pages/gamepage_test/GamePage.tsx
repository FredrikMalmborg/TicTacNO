import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import Board from "../../components/game/board/board";
import { TCellState } from "../../components/game/cell/cell";

interface IStyles {
  container: StyleProp<ViewStyle>;
  cell: StyleProp<ViewStyle>;
  deactivated: StyleProp<ViewStyle>;
  empty: StyleProp<ViewStyle>;
  x: StyleProp<ViewStyle>;
  o: StyleProp<ViewStyle>;
}

const GamePage = () => {
  // const [fontsLoaded /*, error */] = useFonts({ FredokaOne_400Regular });

  const board = [
    [1, 0, 0, 2, 0],
    [2, 1, 1, 1, 0],
    [0, 1, 2, 3, 3],
    [1, 1, 2, 1, 0],
    [0, 3, 0, 2, 3],
  ];

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const length = windowWidth > windowHeight ? windowHeight : windowWidth;

  return (
    <View style={[style.viewContainer]}>
      <Board board={board} />
    </View>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 30,
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
    elevation: 3,
  },

  deactivated: {
    opacity: 0.33,
    elevation: 0,
    borderWidth: 0,
  },
  empty: {
    borderColor: "#c1c1c1",
    backgroundColor: "#fff",
    shadowColor: "#c1c1c1",
    // boxShadow: "-4px 4px 0px #D7D7D7",
  },
  x: {
    borderColor: "#BB2832",
    backgroundColor: "#fa5457",
    shadowColor: "#BB2832",
    // boxShadow: "-4px 4px 0px #BB2832",
  },
  o: {
    borderColor: "#0B797D",
    backgroundColor: "#03D2DB",
    shadowColor: "#0B797D",
    // boxShadow: "-4px 4px 0px #0B797D",
  },
});

export default GamePage;
