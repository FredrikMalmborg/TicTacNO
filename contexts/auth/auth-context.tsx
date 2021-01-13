import React from "react";
import { TSignInAction } from "./auth-provider";

export type TError = "SIGNIN" | "SIGNUP" | null
export interface IUserState {
  isLoading: boolean;
  error: TError;
  isSignedOut: boolean;
  userToken: string | null;
}


type TReducerAction =
  | { type: "RESTORE"; token: string | null }
  | { type: "HANDLE_ERROR"; error: TError }
  | { type: "LOADING_USER" }
  | { type: "SIGN_IN"; token: string | null }
  | { type: "SIGN_OUT" };

export const INITIAL_STATE: IUserState = {
  isLoading: true,
  isSignedOut: false,
  userToken: null,
  error: null,
};

export const userState = (prevState: IUserState, action: TReducerAction) => {
  switch (action.type) {
    case "RESTORE":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        error: null
      };
    case "HANDLE_ERROR":
      return {
        ...prevState,
        isLoading: false,
        error: action.error,
      };
    case "LOADING_USER":
      return {
        ...prevState,
        isLoading: true,
        error: null
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isLoading: false,
        isSignedOut: false,
        userToken: action.token,
        error: null
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignedOut: true,
        userToken: null,
        error: null
      };
  }
};

const AuthContext = React.createContext({
  authContext: {
    signIn: (action: TSignInAction) => { },
    signOut: () => { },
    signUp: (payload: {
      email: string;
      password: string;
      passwordConfirm: string;
    }) => { },
    setError: (error: TError) => { },
  },
  user: INITIAL_STATE,
});

export default AuthContext;
