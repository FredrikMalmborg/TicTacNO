export const Pages = {
  Start: "StartPage",
  Play: "PlayPage",
  Profile: "ProfilePage",
  Game: "GamePage",
  Login: "LoginPage",
  InitialSetup: "InitialSetup",
  Splash: "SplashPage",
  PreGameRoom: "PreGameRoom",
} as const;
export type ScreenName = keyof typeof Pages;
