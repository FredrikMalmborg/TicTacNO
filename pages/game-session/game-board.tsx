import React, { memo, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  BackHandler,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";
import AuthContext from "../../contexts/auth/auth-context";
import RoomContext from "../../contexts/room/room-context";
import TicTacText from "../../components/text/Text";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Circle,
  Image as SvgImage,
} from "react-native-svg";
import colors from "../../constants/colors";

export type ZoomLevel = 0 | 1 | 2;

interface UIstyle {
  turnviewContainer: StyleProp<ViewStyle>;
  turnviewGradient: StyleProp<ViewStyle>;
  turnviewIcon: StyleProp<ViewStyle>;
}

const GameBoard = () => {
  const windowSize = Dimensions.get("screen");
  const {
    roomState: { player1, player2, playerTurn, gameBoard, availableCells },
  } = useContext(RoomContext);
  const {
    userStatus: { userToken },
  } = useContext(AuthContext);
  const handleBackButton = () => {
    return true;
  };
  const [yourTurn, setYourTurn] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(1);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  });

  useEffect(() => {
    if (
      yourPlayer() !== null &&
      playerTurn !== null &&
      yourPlayer()?.id === playerTurn.id
    ) {
      setYourTurn(true);
    } else {
      setYourTurn(false);
    }
  }, [playerTurn]);

  const yourPlayer = () =>
    userToken && player1 && player2 && userToken === player1.id
      ? player1
      : player2;

  const zoomIn = require("../../assets/images/icons/zoomIn.png");
  const zoomOut = require("../../assets/images/icons/zoomOut.png");

  const UI: UIstyle = StyleSheet.create({
    turnviewContainer: {
      position: "absolute",
      width: "100%",
      height: "50%",
      alignItems: "center",
    },
    turnviewGradient: {
      width: "100%",
      height: "100%",
    },
    turnviewIcon: {
      position: "absolute",
      top: 50,
    },
  });

  const turnGradient = (
    <View style={UI.turnviewGradient}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="grad" x1="1" x2="1" y1="1" y2="0">
            <Stop offset="0" stopColor="#0000" stopOpacity="0" />
            <Stop
              offset="1"
              stopColor={playerTurn?.cellId === 3 ? colors.red.light : colors.teal.light}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Path
          fillOpacity={0.6}
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
      <View style={UI.turnviewContainer}>
        {turnGradient}
        <Svg style={UI.turnviewIcon} width={60} height={60} viewBox="0 0 60 60">
          {playerTurn?.cellId === 3 ? (
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
          ) : (
              <Circle
                cx="30"
                cy="30"
                r="20"
                stroke={colors.teal.dark}
                strokeWidth="20"
              />
            )}
        </Svg>
      </View>
      <PanCamera windowSize={windowSize}>
        {gameBoard && availableCells && (
          <Board
            zoomLevel={zoomLevel}
            gameBoard={gameBoard}
            yourTurn={yourTurn}
            playerState={yourPlayer()?.cellId}
            aCells={availableCells}
          />
        )}
      </PanCamera>
      <View
        style={{
          width: "100%",
          height: 60,
          padding: 8,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ width: 60, height: "100%" }}
          onPress={() => {
            setZoomLevel(
              zoomLevel === 0
                ? 1
                : zoomLevel === 1
                  ? 2
                  : zoomLevel === 2
                    ? 0
                    : zoomLevel
            );
          }}
        >
          <Svg width="100%" height="100%">
            <SvgImage
              width="100%"
              height="100%"
              href={(() => {
                switch (zoomLevel) {
                  case 0:
                    return zoomIn;
                  case 1:
                    return zoomIn;
                  case 2:
                    return zoomOut;
                }
              })()}
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(GameBoard);
