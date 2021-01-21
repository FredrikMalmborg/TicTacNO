import React, { useContext } from "react";
import GamePage from "../game-session/game-page";
import StartPage from "../start/startpage";
import PlayPage from "../play/playPage";
import LoginPage from "../login/loginPage";
// import PreGameRoom from "../pre-game-room/pre-game-room";
import InitialSetup from "../initial-setup/initial-setup";

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
  [Pages.GamePage]: {
    condition: "RECON-JOIN" | "JOIN" | "RECON-HOST" | "HOST";
  };
  [Pages.Play]: undefined;
  [Pages.Login]: undefined;
  [Pages.Splash]: undefined;
  [Pages.InitialSetup]: undefined;
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
          {user.userToken === null ? (
            <Stack.Screen name={Pages.Login} component={LoginPage} />
          ) : (
            <>
              <Stack.Screen name={Pages.Start} component={StartPage} />
              {/* <Stack.Screen name={Pages.PreGameRoom} component={PreGameRoom} /> */}
              <Stack.Screen name={Pages.Play} component={PlayPage} />
              <Stack.Screen
                name={Pages.GamePage}
                component={GamePage}
                options={{ gestureEnabled: false }}
              />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default PageNavigator;
