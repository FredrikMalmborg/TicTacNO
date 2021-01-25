import React, { useContext, useEffect } from "react";
import GamePage from "../game-session/game-page";
import StartPage from "../start/startpage";
import PlayPage from "../play/playPage";
import ProfilePage from "../profile/profile-page";
import LoginPage from "../login/loginPage";
import InitialSetup from "../initial-setup/initial-setup";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { Pages } from "../pages";
import { forSlide } from "./page-animations";
import SplashScreen from "./splash-screen";
import AuthContext from "../../contexts/auth/auth-context";
import DEV_board from "../DEV/DEV_board";

export type StackParamlist = {
  [Pages.Start]: undefined;
  [Pages.GamePage]: {
    condition: "RECON-JOIN" | "JOIN" | "RECON-HOST" | "HOST";
  };
  [Pages.Play]: undefined;
  [Pages.Profile]: undefined;
  [Pages.Login]: undefined;
  [Pages.Splash]: undefined;
  [Pages.InitialSetup]: undefined;
  [Pages.DEV]: undefined;
};

const PageNavigator = () => {
  const Stack = createStackNavigator<StackParamlist>();

  const pageOptions: StackNavigationOptions = {
    cardStyleInterpolator: forSlide,
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
  };

  const { userStatus } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName={Pages.Login} screenOptions={pageOptions}>
      {userStatus.isLoading ? (
        <Stack.Screen
          name={Pages.Splash}
          component={SplashScreen}
          options={pageOptions}
        />
      ) : (
          <>
            {userStatus.isSignedOut ? (
              <Stack.Screen name={Pages.Login} component={LoginPage} />
            ) : !userStatus.userName ? (
              <Stack.Screen name={Pages.InitialSetup} component={InitialSetup} />
            ) : (
                  <>
                    <Stack.Screen name={Pages.Start} component={StartPage} />
                    <Stack.Screen name={Pages.Play} component={PlayPage} />
                    <Stack.Screen name={Pages.Profile} component={ProfilePage} />
                    <Stack.Screen name={Pages.DEV} component={DEV_board} />
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
