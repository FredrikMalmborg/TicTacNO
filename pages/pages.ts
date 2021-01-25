export const Pages = {
  Start: "StartPage",
  Play: "PlayPage",
  Profile: "ProfilePage",
  GamePage: "GamePage",
  Login: "LoginPage",
  InitialSetup: "InitialSetup",
  Splash: "SplashPage",
  DEV: "DEV",
} as const;
export type ScreenName = keyof typeof Pages;
