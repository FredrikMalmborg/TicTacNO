import React from "react";
import { TSignInAction } from "./auth-provider";

export interface IUserState {
  isLoading: boolean;
  isSignedOut: boolean;
  userToken: string | null;
  newUser: boolean;
}

type TReducerAction =
  | { type: "RESTORE"; token: string | null }
  | { type: "LOADING_USER" }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" }
  | { type: "NEW_USER" }
  | { type: "SET_USERNAME" };

export const INITIAL_STATE: IUserState = {
  isLoading: true,
  isSignedOut: false,
  userToken: null,
  newUser: false,
};

export const userState = (prevState: IUserState, action: TReducerAction) => {
  switch (action.type) {
    case "RESTORE":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "LOADING_USER":
      return {
        ...prevState,
        isLoading: true,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isLoading: false,
        isSignedOut: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isLoading: false,
        userToken: null,
        isSignedOut: true,
        newUser: false,
      };
    case "NEW_USER": {
      return {
        ...prevState,
        newUser: true,
      };
    }
    case "SET_USERNAME": {
      return {
        ...prevState,
        newUser: false,
      };
    }
  }
};

const AuthContext = React.createContext({
  authContext: {
    signIn: (action: TSignInAction) => {},
    setUserName: (username: string) => {},
    signOut: () => {},
    signUp: (data: any) => {},
  },
  user: INITIAL_STATE,
});

export default AuthContext;
