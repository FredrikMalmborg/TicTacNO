import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useEffect, useReducer } from "react";
import { useMemo } from "react";
import AuthContext, { INITIAL_STATE, userState } from "./auth-context";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORA_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  FACEBOOK_APP_ID,
} from "@env";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

const androidClientId = ANDROID_CLIENT_ID;
const iosClientId = IOS_CLIENT_ID;
const facebookAppId = FACEBOOK_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORA_BUCKET,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export type TSignInAction =
  | { type: "EMAIL"; payload: { email: string; password: string } }
  | { type: "GOOGLE" }
  | { type: "FACEBOOK" };

const AuthProvider: FC = ({ children }) => {
  const [user, dispatch] = useReducer(userState, INITIAL_STATE);

  const authContext = useMemo(
    () => ({
      signIn: (action: TSignInAction) => {
        switch (action.type) {
          case "GOOGLE":
            signInWithGoogle();
            break;
          case "FACEBOOK":
            signInWithFacebook();
            break;
          case "EMAIL":
            signInWithEmail(action.payload);
            break;
        }
        // if (result.success) {
        //   dispatch({ type: "SIGN_IN", token: "dummy_token" });
        // }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data: any) => {
        //Registrera mot backend här - dummy_token är en userID
        dispatch({ type: "SIGN_IN", token: "dummy_token" });
      },
    }),
    []
  );

  // Inloggning mot Google
  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        // iosStandaloneAppClientId: iosStandAloneClientId,
      });
      if (result.type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        console.log("success: ", googleProfileData);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  // Inloggning mot Facebook
  const signInWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: facebookAppId,
      });
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (result.type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(
          result.token
        );
        console.log(credential);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        console.log("success: ", facebookProfileData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Inloggning mot email
  const signInWithEmail = async (payload: {
    email: string;
    password: string;
  }) => {
    console.log("Email!");

    return "auth Email";
  };

  useEffect(() => {
    const bootStrapUserToken = async () => {
      let userToken = null;
      try {
        //Hämta userID från "localstorage"
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: "RESTORE", token: userToken });
    };
    bootStrapUserToken();
  }, [])

  return (
    <AuthContext.Provider value={{ user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
