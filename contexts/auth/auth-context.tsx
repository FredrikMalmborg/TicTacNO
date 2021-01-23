import React from "react";
import { TSignInAction } from "./auth-provider";

export type TError = "SIGNIN" | "SIGNUP" | null;
export interface IUserState {
  isLoading: boolean;
  error: TError;
  isSignedOut: boolean;
  userToken: string | null;
  userName: false | string;
}

type TReducerAction =
  | { type: "RESTORE"; token: string | null }
  | { type: "HANDLE_ERROR"; error: TError }
  | { type: "LOADING_USER"; isLoading: boolean }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" }
  | { type: "NEW_USER" }
  | { type: "SET_USERNAME"; username: string };

export const INITIAL_STATE: IUserState = {
  isLoading: true,
  isSignedOut: false,
  userToken: null,
  userName: false,
  error: null,
};

export const userState = (prevState: IUserState, action: TReducerAction) => {
  switch (action.type) {
    case "RESTORE":
      return {
        ...prevState,
        userToken: action.token,
        error: null,
      } as IUserState;
    case "HANDLE_ERROR":
      return {
        ...prevState,
        error: action.error,
      } as IUserState;
    case "LOADING_USER":
      return {
        ...prevState,
        isLoading: action.isLoading,
        error: null,
      } as IUserState;
    case "SIGN_IN":
      return {
        ...prevState,
        isSignedOut: false,
        userToken: action.token,
        error: null,
      } as IUserState;
    case "SIGN_OUT":
      return {
        ...prevState,
        userToken: null,
        isSignedOut: true,
        isLoading: false,
        userName: false,
      } as IUserState;
    case "NEW_USER": {
      return {
        ...prevState,
        userName: false,
        isLoading: false,
      } as IUserState;
    }
    case "SET_USERNAME": {
      return {
        ...prevState,
        userName: action.username,
        isLoading: false,
        error: null,
      } as IUserState;
    }
  }
};

const AuthContext = React.createContext({
  authContext: {
    signIn: (action: TSignInAction) => {},
    setUserName: (username: string) => {},
    signOut: () => {},
    signUp: (payload: {
      email: string;
      password: string;
      passwordConfirm: string;
    }) => {},
    setError: (error: TError) => {},
  },
  user: INITIAL_STATE,
});

export default AuthContext;
