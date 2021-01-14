import React, { FC, useEffect, useReducer } from "react";
import { useMemo } from "react";
import AuthContext, { INITIAL_STATE, TError, userState } from "./auth-context";
import {
  // API_KEY,
  // AUTH_DOMAIN,
  // DATABASE_URL,
  // PROJECT_ID,
  // STORA_BUCKET,
  // MESSAGE_SENDER_ID,
  // APP_ID,
  // MEASUREMENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  FACEBOOK_APP_ID,
} from "@env";
import fb from "firebase";
import { firebase } from "../../constants/firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import AlertAsync from "react-native-alert-async";

const androidClientId = ANDROID_CLIENT_ID;
const iosClientId = IOS_CLIENT_ID;
const facebookAppId = FACEBOOK_APP_ID;

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORA_BUCKET,
//   messagingSenderId: MESSAGE_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app();
// }

export type TSignInAction =
  | { type: "EMAIL"; payload: { email: string; password: string } }
  | { type: "GOOGLE" }
  | { type: "FACEBOOK" };

const AuthProvider: FC = ({ children }) => {
  const [user, dispatch] = useReducer(userState, INITIAL_STATE);

  const authContext = useMemo(
    () => ({
      signIn: async (action: TSignInAction) => {
        const result = await (async () => {
          dispatch({ type: "LOADING_USER" });
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
        if (result !== null) {
          dispatch({ type: "SIGN_IN", token: result });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      },
      setUserName: async (username: string) => {
        //KAN AWAITAS FÖR ERROR HANTERING
        const userId = firebase.auth().currentUser?.uid;
        if (userId) {
          const uniqueVal = Math.floor(1000 + Math.random() * 9000);
          const newUserRef = firebase.database().ref(`users/${userId}`);
          newUserRef.child("username").set(`${username}#${uniqueVal}`);
          dispatch({ type: "SET_USERNAME" });
        }
      },
      signOut: async () => {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            dispatch({ type: "SIGN_OUT" });
          })
          .catch((e) => console.log(e));
      },
      signUp: async (payload: {
        email: string;
        password: string;
        passwordConfirm: string;
      }) => {
        if (payload.password === payload.passwordConfirm) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((user) => console.log(user))
            .catch((error) => {
              console.log(error);
              dispatch({ type: "HANDLE_ERROR", error: "SIGNUP" });
            });
        }
      },
      setError: async (error: TError) => {
        dispatch({ type: "HANDLE_ERROR", error });
      },
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
        await firebase.auth().setPersistence(fb.auth.Auth.Persistence.LOCAL);
        const credential = fb.auth.GoogleAuthProvider.credential(
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
        await firebase.auth().setPersistence(fb.auth.Auth.Persistence.LOCAL);
        const credential = fb.auth.FacebookAuthProvider.credential(
          result.token
        );
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential)
          .catch(async (e) => {
            if (e.code === "auth/account-exists-with-different-credential") {
              await AlertAsync(
                "User with email already exists",
                "User linking is a work in progress; Please use existing account in the meantime.",
                [{ text: "Ok", onPress: () => Promise.resolve(null) }],
                {
                  cancelable: true,
                  onDismiss: () => Promise.resolve(null),
                }
              );
            }
          });
        if (facebookProfileData && facebookProfileData.user) {
          // await checkIfNewUser(facebookProfileData.user.uid);
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

  // Kontrollerar databasen efter användardata
  // Går att kontrollera om en användare är ny via
  // "user.additionalUserInfo?.isNewUser"
  // men förutser problem.
  const checkIfNewUser = async (userId: string) => {
    console.log("Checking if new user");
    const userData = await firebase
      .database()
      .ref(`users/${userId}`)
      .once("value", (snap) => snap.val);
    if (userData.hasChild("username")) {
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  };

  // Inloggning mot email
  const signInWithEmail = async (payload: {
    email: string;
    password: string;
  }): Promise<string | null> => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        if (user && user.user) {
          return user.user.uid;
        } else return null;
      })
      .catch((error) => {
        const errorCode = error.code,
          errorMessage = error.message;
        console.log("SIGNIN ERROR : ", errorCode, errorMessage);
        dispatch({ type: "HANDLE_ERROR", error: "SIGNIN" });

        return null;
      });
  };

  useEffect(() => {
    if (user.userToken === null) {
      firebase.auth().onAuthStateChanged(async (user) => {
        let userToken = null;
        if (user) {
          const newUser = await checkIfNewUser(user.uid);
          if (newUser) {
            dispatch({ type: "NEW_USER" });
          } else {
            dispatch({ type: "SET_USERNAME" });
          }
          userToken = user.uid;
        }
        console.log(userToken);

        dispatch({ type: "RESTORE", token: userToken });
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
