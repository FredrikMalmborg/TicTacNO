import React, { FC, useEffect, useMemo, useReducer, useState } from "react";
import RoomContext, {
  INITIAL_ROOM,
  INITIAL_ROOM_STATUS,
  IRoomState,
  roomStatusReducer,
} from "./room-context";
import { firebase } from "../../constants/firebase";
import fb from "firebase";

const RoomProvider: FC = ({ children }) => {
  const [roomStatus, dispatch] = useReducer(
    roomStatusReducer,
    INITIAL_ROOM_STATUS
  );
  const [room, setRoom] = useState<IRoomState>(INITIAL_ROOM);
  const roomsRef = firebase.database().ref("rooms");
  const hostRoomRef = roomsRef.push();
  const user = firebase.auth().currentUser?.uid;
  const userRef = firebase.database().ref(`users/${user}`);

  const roomContext = useMemo(
    () => ({
      hostRoom: async () => {
        const roomId = Math.random().toString(36).substr(2, 5);
        const username = await findUsername();
        hostRoomRef.set({
          ...INITIAL_ROOM,
          player1: { id: user, displayName: username },
          rid: roomId,
        });
        hostRoomRef.on("value", (room) => {
          const data = room.val();
          if (data) {
            setRoom(data);
          }
        });
      },
      destroyRoom: () => {
        hostRoomRef.off();
        hostRoomRef.remove();
        setRoom(INITIAL_ROOM);
      },
      joinRoom: async (roomId: string) => {
        dispatch({ type: "LOADING", isLoading: true });
        let success = false;
        let roomKeyId = undefined;
        try {
          const foundRoom = await findRoomById(roomId);
          if (foundRoom) {
            const username = await findUsername();
            const addPlayer = await foundRoom.ref
              .child("player2")
              .set({ displayName: username, id: user })
              .catch(() => false)
              .then(() => true);
            if (addPlayer) {
              success = true;
              roomKeyId = foundRoom.key;
              foundRoom.ref.on("value", (room) => {
                const data = room.val();
                if (data) {
                  setRoom(data);
                }
              });
              foundRoom.ref.on("child_removed", (room) => {
                setRoom(INITIAL_ROOM);
              });
            }
          }
        } catch (e) {
          console.log(e);
        } finally {
          if (success && roomKeyId) {
            dispatch({ type: "SUCCESS", roomKey: roomKeyId });
          } else {
            dispatch({ type: "ERROR", message: "Found no room" });
          }
          dispatch({ type: "LOADING", isLoading: false });
        }
      },
      resetRoomStatus: () => {
        dispatch({ type: "RESET" });
      },
      leaveRoom: async () => {
        dispatch({ type: "LOADING", isLoading: true });
        let success = false;
        try {
          const foundRoom = await findRoomByUser();
          if (foundRoom) {
            const removePlayer = await foundRoom.ref
              .child("player2")
              .remove()
              .catch(() => false)
              .then(() => true);
            if (removePlayer) {
              foundRoom.ref.off("value");
              foundRoom.ref.off("child_removed");
            }
          }
        } catch (e) {
          console.log(e);
        } finally {
          if (success) {
            dispatch({ type: "RESET" });
          } else {
            dispatch({ type: "ERROR", message: "Something went wrong" });
          }
          dispatch({ type: "LOADING", isLoading: false });
        }
      },
    }),
    []
  );

  const findRoomById = async (
    roomId: string
  ): Promise<undefined | fb.database.DataSnapshot> => {
    const room = await roomsRef
      .once("value", (snapshot) => snapshot)
      .then((result) => {
        let wantedRoom;
        result.forEach((room) => {
          const roomLookup = room.child("rid").val();
          if (roomLookup === roomId) {
            wantedRoom = room;
          }
        });
        return wantedRoom;
      })
      .then((room) => room);
    return room;
  };

  const findRoomByUser = async (): Promise<
    undefined | fb.database.DataSnapshot
  > => {
    const room = await roomsRef
      .once("value", (snapshot) => snapshot)
      .then((result) => {
        let wantedRoom;
        const user = firebase.auth().currentUser?.uid;
        result.forEach((room) => {
          const player1: string = room.child("player1").child("id").val();
          const player2: string = room.child("player2").child("id").val();
          if (user && player1 && player2) {
            if (player1 === user || player2 === user) {
              wantedRoom = room;
            }
          }
        });
        return wantedRoom;
      })
      .then((room) => room);
    return room;
  };

  const findUsername = async (): Promise<string> => {
    const username = await userRef
      .once("value")
      .then(
        (snapshot) => (snapshot.val() && snapshot.val().username) || "Anonymous"
      );
    return username;
  };

  // REMOVES ERRORMSG AUTOMATICALLY
  useEffect(() => {
    if (roomStatus.errorMsg) {
      setTimeout(() => {
        dispatch({ type: "ERROR", message: false });
      }, 3000);
    }
  }, [roomStatus.errorMsg]);

  return (
    <RoomContext.Provider value={{ roomContext, roomStatus, room }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
