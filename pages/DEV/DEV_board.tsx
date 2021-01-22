import React, { memo, useContext, useEffect, useState } from "react";
import { SafeAreaView, Dimensions, BackHandler, TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Svg, Image as SvgImage, Circle, Path, Defs, RadialGradient, Stop, LinearGradient } from "react-native-svg";

import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";
import TicTacText from "../../components/text/Text";
import { TCellState } from "../../components/game/cell/cell";
import { INITIAL_ACELLS as INCELLS } from "../../components/game/board/DEFAULT_BOARD";
import colors from "../../constants/colors";
import Gradient from "../../components/background/gradient";
import { color } from "react-native-reanimated";

export type ZoomLevel = 0 | 1 | 2;

interface UIstyle {
  turnview: StyleProp<ViewStyle>
  turnviewBG: StyleProp<ViewStyle>
}

const DEV_Board = () => {
  const windowSize = Dimensions.get("screen");
  const handleBackButton = () => {
    return true;
  };
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(1);
  const [yourTurn, setYourTurn] = useState<boolean>(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  });

  const TEST_BOARD: TCellState[][] = [
    [1, 1, 1, 0, 0, 0, 0],
    [1, 2, 1, 1, 1, 1, 0],
    [1, 1, 2, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 1, 0],
    [0, 1, 2, 2, 4, 1, 0],
    [0, 1, 1, 1, 2, 1, 0],
    [0, 0, 0, 1, 1, 1, 0],
  ];


  const zoomIn = require("../../assets/images/icons/zoomIn.png");
  const zoomOut = require("../../assets/images/icons/zoomOut.png");

  const UI: UIstyle = StyleSheet.create({
    turnview: {
      width: "30%",
      alignItems: "center",
      flexDirection: "column",
      padding: 10,
      paddingTop: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    turnviewBG: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: "50%",
    }
  })



  const turnGradient = (
    <View style={UI.turnviewBG}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="grad"
            x1="1"
            x2="1"
            y1="1"
            y2="0">
            <Stop offset="0" stopColor="#0000" stopOpacity="0" />
            <Stop offset="1" stopColor={yourTurn ? colors.red.light : colors.teal.light} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          fillOpacity={.6}
          fill="url(#grad)"
          d={`M0 0
            h100
            v100  
            H0z`}
        />
      </Svg>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      {turnGradient}
      <View style={UI.turnview}>
        <Svg
          width={60}
          height={60}
          viewBox="0 0 60 60"
        >
          {yourTurn ?
            <>
              <Path
                d="M57.0644 42.8908C60.9783 46.8048 60.9783 53.1506 57.0644 57.0645C53.1504 60.9785 46.8046 60.9785 42.8907 57.0645L2.93547 17.1093C-0.978494 13.1954 -0.978485 6.8496 2.93547 2.93564C6.84944 -0.978323 13.1952 -0.978324 17.1092 2.93564L57.0644 42.8908Z"
                fill={colors.red.dark}
              />
              <Path
                d="M43.013 2.93547C46.9269 -0.978494 53.2727 -0.978486 57.1867 2.93547C61.1006 6.84943 61.1006 13.1952 57.1867 17.1092L17.2315 57.0644C13.3175 60.9783 6.97174 60.9783 3.05778 57.0644C-0.856181 53.1504 -0.856183 46.8046 3.05778 42.8907L43.013 2.93547Z"
                fill={colors.red.dark}
              />
            </>
            :
            <Circle cx="30" cy="30" r="20" stroke={colors.teal.dark} strokeWidth="20" />
          }
        </Svg>
      </View>
      <PanCamera windowSize={windowSize}>
        <Board
          zoomLevel={zoomLevel}
          gameBoard={TEST_BOARD}
          yourTurn={yourTurn}
          playerState={3}
          aCells={INCELLS}
        />
      </PanCamera>
      <View style={{ width: "100%", height: 60, padding: 8, justifyContent: "space-between", flexDirection: "row" }}>
        <TicTacText label="switch turn" size="sm" button={{ onClick: () => setYourTurn(!yourTurn) }} />
        <TouchableOpacity style={{ width: 60, height: "100%" }} onPress={() => {
          setZoomLevel(zoomLevel === 0 ? 1 : zoomLevel === 1 ? 2 : zoomLevel === 2 ? 0 : zoomLevel)
        }}>
          <Svg width="100%" height="100%">
            <SvgImage width="100%" height="100%" href={(() => {
              switch (zoomLevel) {
                case 0: return zoomIn
                case 1: return zoomIn
                case 2: return zoomOut
              }
            })()} />
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(DEV_Board);
