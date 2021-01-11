export const Pages = {
  Start: "StartPage",
  Play: "PlayPage",
  Profile: "ProfilePage",
  Game: "GamePage",
  Login: "LoginPage",
  Splash: "SplashPage",
} as const;
export type ScreenName = keyof typeof Pages;
