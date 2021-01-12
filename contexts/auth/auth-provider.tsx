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
      signIn: async (action: TSignInAction) => {
        dispatch({ type: "LOADING_USER" });
        const result = await (async () => {
          switch (action.type) {
            case "GOOGLE":
              const googlePromise = await signInWithGoogle();
              return googlePromise;
            case "FACEBOOK":
              const facebookPromise = await signInWithFacebook();
              return facebookPromise;
            case "EMAIL":
              const emailPromise = await signInWithEmail(action.payload);
              return emailPromise;
          }
        })();
        dispatch({ type: "SIGN_IN", token: result });
      },
      signOut: async () => {
        await firebase.auth().signOut()
          .then(() => {
            dispatch({ type: "SIGN_OUT" })
          })
          .catch((err) => console.log(err))
      },
      signUp: async (payload: {
        email: string;
        password: string;
        passwordConfirm: string;
      }) => {
        if (payload.password === payload.passwordConfirm) {
          firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
              console.log(user);
            })
            .catch((error) => {
              const errorCode = error.code,
                errorMessage = error.message;
              console.log("REGISTER ERROR : ", errorCode, errorMessage);

            });
        }
      }
    }),
    []
  );

  // Inloggning mot Google
  const signInWithGoogle = async (): Promise<string | null> => {
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
        if (googleProfileData && googleProfileData.user) {
          return googleProfileData.user.uid;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      console.log("Error: ", e);
      return null;
    }
  };

  // Inloggning mot Facebook
  const signInWithFacebook = async (): Promise<string | null> => {
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
        if (facebookProfileData && facebookProfileData.user) {
          return facebookProfileData.user.uid;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  // Inloggning mot email
  const signInWithEmail = async (payload: {
    email: string;
    password: string;
  }): Promise<string | null> => {
    return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        if (user && user.user) {
          return user.user.uid;
        } else
          return null;
      })
      .catch((error) => {
        const errorCode = error.code,
          errorMessage = error.message;
        console.log("SIGNIN ERROR : ", errorCode, errorMessage);
        return null;
      });
  };

  useEffect(() => {
    const bootStrapUserToken = () => {
      firebase.auth().onAuthStateChanged((user) => {
        let userToken = null;
        if (user) {
          userToken = user.uid;
        }
        console.log(userToken);

        dispatch({ type: "RESTORE", token: userToken });
      });
    };
    bootStrapUserToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
