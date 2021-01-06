import React from "react";
import GamePage from "../gameplay/GamePage";
import StartPage from "../start/startpage";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Pages } from "../pages";
import PlayPage from "../play/playPage";
import { forSlide } from "./page-animations";

export type StackParamlist = {
  [Pages.Start]: undefined;
  [Pages.Game]: undefined;
  [Pages.Play]: undefined;
};

const PageNavigator = () => {
  const Stack = createStackNavigator<StackParamlist>();

  const pageOptions: StackNavigationOptions = {
    cardStyleInterpolator: forSlide,
  };

  return (
    <Stack.Navigator
      initialRouteName={Pages.Start}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name={Pages.Game}
        component={GamePage}
        options={{gestureEnabled: false, ...pageOptions}}
      />
      <Stack.Screen
        name={Pages.Start}
        component={StartPage}
        options={pageOptions}
      />
      <Stack.Screen
        name={Pages.Play}
        component={PlayPage}
        options={pageOptions}
      />
    </Stack.Navigator>
  );
};

export default PageNavigator;
