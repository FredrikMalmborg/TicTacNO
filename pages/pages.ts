export const Pages = {
  Start: "StartPage",
  Play: "PlayPage",
  Profile: "ProfilePage",
  Game: "GamePage",
} as const;
export type ScreenName = keyof typeof Pages;
