import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import TicTacText from "../../components/text/Text";

// import {
//   useFonts,
//   FredokaOne_400Regular,
// } from "@expo-google-fonts/fredoka-one";

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
    <View style={[style.container, { width: length, height: length }]}>
      <Grid style={{ width: "100%", height: "100%" }}>
        {board.map((row, index) => (
          <Row key={`row-${index}`}>
            {row.map((col, index) => {
              switch (col) {
                case 0:
                  return (
                    <Col
                      key={`cell-${col}/${index}`}
                      style={[style.cell, style.deactivated]}
                    ></Col>
                  );
                case 1:
                  return (
                    <Col
                      key={`cell-${col}/${index}`}
                      style={[style.cell, style.empty]}
                    ></Col>
                  );
                case 2:
                  return (
                    <Col
                      key={`cell-${col}/${index}`}
                      style={[style.cell, style.x]}
                    >
                      <TicTacText size="sm" centered color="#fff">X</TicTacText>
                    </Col>
                  );
                case 3:
                  return (
                    <Col
                      key={`cell-${col}/${index}`}
                      style={[style.cell, style.o]}
                    >
                      <TicTacText size="sm" centered color="#fff">O</TicTacText>
                    </Col>
                  );
              }
            })}
          </Row>
        ))}
      </Grid>
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
    elevation: 3
  },

  deactivated: {
    opacity: 0.33,
    elevation: 0,
    borderWidth: 0
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
