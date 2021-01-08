import React from "react";
import GamePage from "../gameplay/GamePage";
import StartPage from "../start/startpage";
import PlayPage from "../play/playPage";
import LoginPage from "../login/loginPage";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { Pages } from "../pages";
import { forSlide } from "./page-animations";

export type StackParamlist = {
  [Pages.Start]: undefined;
  [Pages.Game]: undefined;
  [Pages.Play]: undefined;
  [Pages.Login]: undefined;
};

const PageNavigator = () => {
  const Stack = createStackNavigator<StackParamlist>();

  const pageOptions: StackNavigationOptions = {
    cardStyleInterpolator: forSlide,
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
  };

  return (
    <Stack.Navigator initialRouteName={Pages.Login} screenOptions={pageOptions}>
      <Stack.Screen
        name={Pages.Game}
        component={GamePage}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={Pages.Start} component={StartPage} />
      <Stack.Screen name={Pages.Play} component={PlayPage} />
      <Stack.Screen name={Pages.Login} component={LoginPage} />
    </Stack.Navigator>
  );
};

export default PageNavigator;
