import React, { FC, useEffect, useReducer, useState } from "react";
import { useMemo } from "react";
import AuthContext, {
  INITIAL_STATE,
  INITIAL_USER,
  IUserState,
  TError,
  userState,
} from "./auth-context";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, FACEBOOK_APP_ID } from "@env";
import fb from "firebase";
import { firebase } from "../../constants/firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import AlertAsync from "react-native-alert-async";

const androidClientId = ANDROID_CLIENT_ID;
const iosClientId = IOS_CLIENT_ID;
const facebookAppId = FACEBOOK_APP_ID;

export type TSignInAction =
  | { type: "EMAIL"; payload: { email: string; password: string } }
  | { type: "GOOGLE" }
  | { type: "FACEBOOK" };

const AuthProvider: FC = ({ children }) => {
  const [userStatus, dispatch] = useReducer(userState, INITIAL_STATE);
  const [userInfo, setUserInfo] = useState(INITIAL_USER);

  const authContext = useMemo(
    () => ({
      signIn: async (action: TSignInAction) => {
        const result = await (async () => {
          dispatch({ type: "LOADING_USER", isLoading: true });
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
          const userData = await findUserDataById(result);
          if (userData) {
            setUserInfo({
              username: userData.username,
              gameStats: userData.gameStats,
            });
          }
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      },
      setUserName: async (username: string) => {
        //KAN AWAITAS FÖR ERROR HANTERING
        const userId = firebase.auth().currentUser?.uid;
        if (userId) {
          const uniqueVal = Math.floor(1000 + Math.random() * 9000);
          const newUsername = `${username}#${uniqueVal}`.replace(/\s+/g, "");
          const newUserRef = firebase.database().ref(`users/${userId}`);
          newUserRef.child("username").set(newUsername);
          newUserRef.child("gameStats").set({ wins: 0, losses: 0 });
          dispatch({ type: "SET_USERNAME", username: newUsername });
        }
      },
      signOut: async () => {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            setUserInfo(INITIAL_USER);
            dispatch({ type: "SIGN_OUT" });
          })
          .catch((error) => console.log("AUTH-ERROR: ", error));
      },
      signUp: async (payload: {
        email: string;
        password: string;
        passwordConfirm: string;
      }) => {
        if (payload.password === payload.passwordConfirm) {
          const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((user) => user)
            .catch((error) => {
              console.log("AUTH-ERROR: ", error);
              dispatch({ type: "HANDLE_ERROR", error: "SIGNUP" });
              return null;
            });
          if (result && result?.user) {
            dispatch({ type: "SIGN_IN", token: result.user?.uid });
            const userData = await findUserDataById(result.user.uid);
            if (userData) {
              setUserInfo({
                username: userData.username,
                gameStats: userData.gameStats,
              });
            }
          } else {
            dispatch({ type: "SIGN_OUT" });
          }
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
    } catch (error) {
      console.log("AUTH ERROR: ", error);
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
    } catch (error) {
      console.log("AUTH-ERROR: ", error);
      return null;
    }
  };

  // Kontrollerar databasen efter användardata
  // Går att kontrollera om en användare är ny via
  // "user.additionalUserInfo?.isNewUser"
  // men förutser problem.
  const checkIfNewUser = async (userId: string): Promise<false | string> => {
    // console.log("Checking if new user");
    const userData = await firebase
      .database()
      .ref(`users/${userId}`)
      .once("value", (snap) => snap.val);
    if (userData.hasChild("username")) {
      const username = userData.child("username").val();
      return Promise.resolve(username);
    } else {
      return Promise.resolve(false);
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

  const findUserDataById = async (
    id: string
  ): Promise<undefined | IUserState> => {
    let foundUser: undefined | IUserState = undefined;
    await firebase
      .database()
      .ref(`users/${id}`)
      .once("value", (result) => {
        const data = result.val();

        if (data && data.username && data.gameStats)
          foundUser = {
            username: data.username,
            gameStats: {
              wins: data.gameStats.wins,
              losses: data.gameStats.losses,
            },
          };
      });
    return foundUser;
  };

  useEffect(() => {
    if (userStatus.userToken === null) {
      firebase.auth().onAuthStateChanged(async (user) => {
        let userToken = null;
        if (user) {
          const username = await checkIfNewUser(user.uid);
          if (!username) {
            dispatch({ type: "NEW_USER" });
          } else {
            dispatch({ type: "SET_USERNAME", username: username });
          }
          userToken = user.uid;
          dispatch({ type: "SIGN_IN", token: userToken });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
        dispatch({ type: "LOADING_USER", isLoading: false });
      });
    }
  }, []);

  // Lyssnare på användardata
  useEffect(() => {
    firebase
      .database()
      .ref("users")
      .on("value", (result) => {
        const currUser = firebase.auth().currentUser;
        if (currUser) {
          let foundUser: undefined | IUserState = undefined;
          result.forEach((user) => {
            if (user.key === currUser.uid) {
              const userData = user.val();
              if (userData && userData.username && userData.gameStats)
                foundUser = {
                  username: userData.username,
                  gameStats: {
                    wins: userData.gameStats.wins,
                    losses: userData.gameStats.losses,
                  },
                };
            }
          });
          if (foundUser) {
            setUserInfo(foundUser);
          }
        }
      });
    return () => {
      firebase.database().ref("users").off();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userStatus, userInfo, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
