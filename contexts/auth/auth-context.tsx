import React from "react";
import { TSignInAction } from "./auth-provider";

export type TError = "SIGNIN" | "SIGNUP" | null;

type TReducerAction =
  | { type: "HANDLE_ERROR"; error: TError }
  | { type: "LOADING_USER"; isLoading: boolean }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" }
  | { type: "NEW_USER" }
  | { type: "SET_USERNAME"; username: string };
export interface IUserStatus {
  isLoading: boolean;
  error: TError;
  isSignedOut: boolean;
  userToken: string | null;
  userName: false | string;
}

export const INITIAL_STATE: IUserStatus = {
  isLoading: true,
  isSignedOut: false,
  userToken: null,
  userName: false,
  error: null,
};

export interface IUserState {
  username: string | null;
  gameStats: {
    wins: number;
    losses: number;
  } | null;
}

export const INITIAL_USER: IUserState = {
  username: null,
  gameStats: null,
};

export const userState = (prevState: IUserStatus, action: TReducerAction) => {
  switch (action.type) {
    case "HANDLE_ERROR":
      return {
        ...prevState,
        error: action.error,
      } as IUserStatus;
    case "LOADING_USER":
      return {
        ...prevState,
        isLoading: action.isLoading,
        error: null,
      } as IUserStatus;
    case "SIGN_IN":
      return {
        ...prevState,
        isSignedOut: false,
        userToken: action.token,
        error: null,
      } as IUserStatus;
    case "SIGN_OUT":
      return {
        ...prevState,
        userToken: null,
        isSignedOut: true,
        userName: false,
      } as IUserStatus;
    case "NEW_USER": {
      return {
        ...prevState,
        userName: false,
      } as IUserStatus;
    }
    case "SET_USERNAME": {
      return {
        ...prevState,
        userName: action.username,
        error: null,
      } as IUserStatus;
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
  userStatus: INITIAL_STATE,
  userInfo: INITIAL_USER,
});

export default AuthContext;
