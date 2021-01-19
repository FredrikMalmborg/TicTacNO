import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { SafeAreaView, Dimensions, BackHandler } from "react-native";
import Board from "../../components/game/board/board";
import PanCamera from "../../components/game/camera/pan-camera";
import { TCellState } from "../../components/game/cell/cell";

import TicTacText from "../../components/text/Text";
import { StackParamlist } from "../page-navigation/PageNavigator";
import { Pages } from "../pages";
interface Props {
  navigation: StackNavigationProp<StackParamlist, "GamePage">;
}

const GamePage = ({ navigation }: Props) => {
  const windowSize = Dimensions.get("screen");
  const handleBackButton = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  });


  const navigateToPlay = () => navigation.navigate(Pages.Play);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TicTacText label="play again" size={15} centered button={{
        onClick: navigateToPlay
      }} />
      <PanCamera windowSize={windowSize}>
        <Board winnerCallback={navigateToPlay} />
      </PanCamera>
    </SafeAreaView>
  );
};

export default GamePage;
