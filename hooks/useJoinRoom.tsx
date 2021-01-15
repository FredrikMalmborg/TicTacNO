import { useCallback, useEffect, useReducer, useState } from "react";
import { firebase } from "../constants/firebase";

const INITIAL_STATE: IJoinState = {
  loading: false,
  errorMsg: false,
  success: false,
};

interface IJoinState {
  loading: boolean;
  errorMsg: string | false;
  success: boolean;
}

type TReducerAction =
  | { type: "ERROR"; message: string | false }
  | { type: "LOADING"; isLoading: boolean }
  | { type: "SUCCESS" };

const joinState = (prevState: IJoinState, action: TReducerAction) => {
  switch (action.type) {
    case "ERROR": {
      return {
        ...prevState,
        errorMsg: action.message,
        success: false,
      };
    }
    case "LOADING": {
      return {
        ...prevState,
        loading: action.isLoading,
      };
    }
    case "SUCCESS": {
      return {
        ...prevState,
        errorMsg: false,
        success: true,
      } as IJoinState;
    }
  }
};

const useJoinRoom = (roomId: string) => {
  const [join, dispatch] = useReducer(joinState, INITIAL_STATE);

  useEffect(() => {
    if (join.errorMsg) {
      setTimeout(() => {
        dispatch({ type: "ERROR", message: false });
      }, 4000);
    }
  }, [join.errorMsg]);

  const joinRoom = useCallback(async () => {
    const roomsRef = firebase.database().ref("rooms");
    dispatch({ type: "LOADING", isLoading: true });
    try {
      await roomsRef.once("value", (snapshot) => {
        let foundRoom = false;
        snapshot.forEach((room) => {
          const roomLookup = room.child("rid").val();
          if (roomLookup === roomId) {
            foundRoom = true;
            const user = firebase.auth().currentUser?.uid;
            if (!user) {
              dispatch({ type: "ERROR", message: "Couldn't load user" });
            } else {
              firebase
                .database()
                .ref(`users/${user}`)
                .once("value")
                .then((snapshot) => {
                  const username =
                    (snapshot.val() && snapshot.val().username) || "Anonymous";
                  firebase
                    .database()
                    .ref(`rooms/${room.key}`)
                    .child("player2")
                    .set({ displayName: username, id: user })
                    .then(() => {
                      dispatch({ type: "SUCCESS" });
                    });
                });
            }
          }
        });
        if (!foundRoom) {
          dispatch({ type: "ERROR", message: "Found no room" });
        }
      });
    } catch (e) {
      dispatch({ type: "ERROR", message: "Couldn't connect to internet" });
    } finally {
      console.log("finally");

      dispatch({ type: "LOADING", isLoading: false });
    }
    return () => {
      roomsRef.off("value");
    };
  }, [roomId]);

  return { join, joinRoom };
};

export default useJoinRoom;
