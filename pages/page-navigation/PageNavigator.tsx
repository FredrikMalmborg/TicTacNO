import React, { useContext } from "react";
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
import SplashScreen from "./splash-screen";
import AuthContext from "../../contexts/auth/auth-context";

export type StackParamlist = {
  [Pages.Start]: undefined;
  [Pages.Game]: undefined;
  [Pages.Play]: undefined;
  [Pages.Login]: undefined;
  [Pages.Splash]: undefined;
};

const PageNavigator = () => {
  const Stack = createStackNavigator<StackParamlist>();

  const pageOptions: StackNavigationOptions = {
    cardStyleInterpolator: forSlide,
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
  };

  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName={Pages.Login} screenOptions={pageOptions}>
      {user.isLoading ? (
        <Stack.Screen
          name={Pages.Splash}
          component={SplashScreen}
          options={pageOptions}
        />
      ) : (
        <>
          {!user.userToken ? (
            <Stack.Screen name={Pages.Login} component={LoginPage} />
          ) : (
            <>
              <Stack.Screen
                name={Pages.Game}
                component={GamePage}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name={Pages.Start} component={StartPage} />
              <Stack.Screen name={Pages.Play} component={PlayPage} />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default PageNavigator;
