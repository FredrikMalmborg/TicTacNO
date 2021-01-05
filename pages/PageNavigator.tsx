import React from "react";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import GamePage from "./gamepage_test/GamePage";
import StartPage from "./startpage/startpage";

import { createStackNavigator } from "@react-navigation/stack";
import { Pages } from "./pages";
import PlayPage from "./playPage/playPage";

export type StackParamlist = {
  [Pages.Start]: undefined;
  [Pages.Game]: undefined;
  [Pages.Play]: undefined;
};

const PageNavigator = () => {
  const Stack = createStackNavigator<StackParamlist>();

  return (
    <Stack.Navigator
      initialRouteName={Pages.Start}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name={Pages.Game} component={GamePage} />
      <Stack.Screen name={Pages.Start} component={StartPage} />
      <Stack.Screen name={Pages.Play} component={PlayPage} />
    </Stack.Navigator>
  );
};

export default PageNavigator;
