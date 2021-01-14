import { useCallback, useEffect, useState } from "react";
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

const useJoinRoom = (roomId: string) => {
  const [joinState, setJoinState] = useState<IJoinState>(INITIAL_STATE);

  useEffect(() => {
    if (joinState.errorMsg) {
      setTimeout(() => {
        setJoinState((prevState) => ({ ...prevState, errorMsg: false }));
      }, 3000);
    }
  }, [joinState.errorMsg]);

  const joinRoom = useCallback(() => {
    const roomsRef = firebase.database().ref("rooms");
    try {
      setJoinState((prevState) => ({ ...prevState, loading: true }));
      roomsRef.once("value", (snapshot) => {
        let foundRoom = false;
        snapshot.forEach((room) => {
          const roomLookup = room.child("rid").val();
          if (roomLookup === roomId) {
            foundRoom = true;
            const user = firebase.auth().currentUser?.uid;
            if (!user) {
              setJoinState((prevState) => ({
                ...prevState,
                errorMsg: "Couldn't load user",
              }));
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
                      setJoinState((prevState) => ({
                        ...prevState,
                        success: true,
                      }));
                    });
                });
            }
            // const roomID = room.child("rid").val();
          }
        });
        if (!foundRoom) {
          setJoinState((prevState) => ({
            ...prevState,
            errorMsg: "Found no room",
          }));
        }
      });
    } catch (e) {
      setJoinState((prevState) => ({
        ...prevState,
        errorMsg: "Couldn't connect to the internet",
      }));
    } finally {
      setJoinState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
    return () => {
      roomsRef.off("value");
      setJoinState(INITIAL_STATE);
    };
  }, [roomId]);

  return { joinState, joinRoom };
};

export default useJoinRoom;
