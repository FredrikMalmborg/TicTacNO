import React, { FC, useEffect, useMemo, useReducer, useState } from "react";
import RoomContext, {
  INITIAL_BOARD,
  INITIAL_ROOM,
  INITIAL_ROOM_STATUS,
  IRoomState,
  roomStatusReducer,
} from "./room-context";
import { firebase } from "../../constants/firebase";
import fb from "firebase";
import { TCellPos, TCellState } from "../../components/game/cell/cell";
import { INITIAL_ACELLS } from "../../components/game/board/DEFAULT_BOARD";

const RoomProvider: FC = ({ children }) => {
  const [roomStatus, dispatch] = useReducer(
    roomStatusReducer,
    INITIAL_ROOM_STATUS
  );
  const [roomState, setRoomState] = useState<IRoomState>(INITIAL_ROOM);
  const roomsRef = firebase.database().ref("rooms");
  const hostRoomRef = roomsRef.push();
  const userRef = firebase.database().ref("users");

  const roomContext = useMemo(
    () => ({
      hostRoom: async () => {
        const roomId = Math.random().toString(36).substr(2, 5);
        const user = firebase.auth().currentUser?.uid;
        if (user) {
          const username = await findUsername(user);
          if (username !== undefined) {
            const player = { id: user, displayName: username, cellId: 3 };
            hostRoomRef.set({
              ...INITIAL_ROOM,
              player1: player,
              rid: roomId,
              playerTurn: player,
            });
            hostRoomRef.on("value", (room) => {
              const data = room.val();
              // console.log("HOST ROOM LISTENER", data);
              if (data) {
                setRoomState(data);
              }
            });
          }
        }
      },
      destroyRoom: async () => {
        const room = await findRoomByUser();
        if (room) {
          room.ref.off();
          room.ref.remove();
          setRoomState(INITIAL_ROOM);
        }
      },
      joinRoom: async (roomId: string) => {
        dispatch({ type: "LOADING", isLoading: true });
        let success = false;
        let roomKeyId = undefined;
        try {
          const foundRoom = await findRoomById(roomId);
          if (foundRoom) {
            const user = firebase.auth().currentUser?.uid;
            if (user) {
              const username = await findUsername(user);
              const player2 = foundRoom.child("player2").val();
              if (!player2) {
                const addPlayer = await foundRoom.ref
                  .child("player2")
                  .set({ displayName: username, id: user, cellId: 4 })
                  .catch(() => false)
                  .then(() => true);
                if (addPlayer) {
                  success = true;
                  roomKeyId = foundRoom.key;
                  foundRoom.ref.on("value", (room) => {
                    const data = room.val();
                    // console.log("JOIN ROOM LISTENER: ", data);
                    if (data) {
                      setRoomState(data);
                    }
                  });
                  roomsRef.on("child_removed", (child) => {
                    const user = firebase.auth().currentUser?.uid;
                    const player2:
                      | { id: string; displayName: string }
                      | undefined = child.val().player2 || undefined;
                    if (player2 && player2.id && player2.id === user) {
                      setRoomState(INITIAL_ROOM);
                    }
                  });
                }
              } else {
                dispatch({ type: "ERROR", message: "Room is full" });
              }
            }
          } else {
            dispatch({ type: "ERROR", message: "Found no room" });
          }
        } catch (e) {
          console.log("JOIN-ROOM ERROR: ", e);
        } finally {
          if (success && roomKeyId) {
            dispatch({ type: "SUCCESS", roomKey: roomKeyId });
          }
          dispatch({ type: "LOADING", isLoading: false });
        }
      },
      checkForOngoingGame: async () => {
        let host = false;
        const fbRoom = await findRoomByUser();
        const user = firebase.auth().currentUser?.uid;
        if (fbRoom && user) {
          const room = fbRoom.val();
          if (user === room.player1.id) {
            host = true;
          }
          return { room: fbRoom, host: host };
        }
        return undefined;
      },
      reconnectToOngoing: (room: fb.database.DataSnapshot) => {
        room.ref.on("value", (room) => {
          const data = room.val();
          if (data) {
            setRoomState(data);
          }
        });
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
          console.log("LEAVE-ROOM ERROR: ", e);
        } finally {
          if (success) {
            dispatch({ type: "RESET" });
          } else {
            dispatch({ type: "ERROR", message: "Something went wrong" });
          }
          dispatch({ type: "LOADING", isLoading: false });
        }
      },
      startGame: async () => {
        const foundRoom = await findRoomByUser();
        if (foundRoom) {
          foundRoom.ref.child("gameStarted").set(true);
        } else {
          console.log("START-GAME ERROR: COUNDN'T FIND ROOM");
        }
      },
      updateGameState: async (board: TCellState[][], aCells: TCellPos[]) => {
        const foundRoom = await findRoomByUser();
        if (foundRoom) {
          const fbRoom = foundRoom.val();
          const player1 = foundRoom.child("player1").val();
          const player2 = foundRoom.child("player2").val();
          const currentPlayer = foundRoom.child("playerTurn").val();

          let nextPlayer;
          if (currentPlayer.id === player1.id) {
            nextPlayer = player2;
          } else {
            nextPlayer = player1;
          }

          const updatedRoom = {
            ...fbRoom,
            gameBoard: board,
            playerTurn: nextPlayer,
            availableCells: aCells,
          };
          foundRoom.ref
            .set(updatedRoom)
            .catch((e) => console.log("UPDATE ROOM ERROR: ", e));
        } else {
          console.log("UPDATE ROOM ERROR: COULDN'T FIND ROOM");
        }
      },
      restartGame: async () => {
        const foundRoom = await findRoomByUser();
        if (foundRoom) {
          const fbRoom = foundRoom.val();
          const restartRoom: IRoomState = {
            ...fbRoom,
            gameBoard: INITIAL_BOARD,
            availableCells: INITIAL_ACELLS,
            rematchValidity: { player1: false, player2: false },
            gameOver: false,
            gameStarted: true,
          };
          foundRoom.ref
            .set(restartRoom)
            .catch((e) => console.log("RESTART GAME ERROR: ", e));
        } else {
          console.log("RESTART GAME ERROR: COULDN'T FIND ROOM");
        }
      },
      resetGame: async () => {
        const foundRoom = await findRoomByUser();
        if (foundRoom) {
          const fbRoom = foundRoom.val();
          const resetRoom: IRoomState = {
            ...fbRoom,
            gameBoard: INITIAL_BOARD,
            availableCells: INITIAL_ACELLS,
            rematchValidity: { player1: false, player2: false },
            gameOver: false,
            gameStarted: false,
          };
          foundRoom.ref
            .set(resetRoom)
            .catch((e) => console.log("RESET TO PRE ERROR: ", e));
        }
      },
      updateRematchValidity: async (valid: boolean) => {
        const currUser = firebase.auth().currentUser?.uid;
        if (currUser) {
          const foundRoom = await findRoomByUser();
          if (foundRoom) {
            let yourPlayer;
            const player1 = foundRoom.child("player1").val();
            if (player1.id === currUser) {
              yourPlayer = "player1";
            } else {
              yourPlayer = "player2";
            }
            foundRoom.ref
              .child("rematchValidity")
              .child(yourPlayer)
              .set(valid ? currUser : false)
              .catch((e) => console.log("REMATCH ERROR: ", e));
          } else {
            console.log("REMATCH ERROR: FOUND NO ROOM");
          }
        } else {
          console.log("REMATCH ERROR: FOUND NO USER");
        }
      },
      updateGameLoser: async (board: TCellState[][]) => {
        const foundRoom = await findRoomByUser();
        if (foundRoom) {
          const fbRoom = foundRoom.val();
          const player1 = foundRoom.child("player1").val();
          const player2 = foundRoom.child("player2").val();
          const loser = foundRoom.child("playerTurn").val();
          if (player1.id === loser.id) {
            addGameStats("losses", player1.id);
            addGameStats("wins", player2.id);
          } else {
            addGameStats("wins", player1.id);
            addGameStats("losses", player2.id);
          }
          foundRoom.ref.set({
            ...fbRoom,
            gameBoard: board,
            losingPlayer: loser,
            gameOver: true,
          });
        }
      },
    }),
    []
  );

  // Adds losses/wins to current user
  const addGameStats = async (key: "losses" | "wins", user: string) => {
    if (user) {
      await userRef
        .child(user)
        .once("value", (userSnap) => userSnap)
        .then(async (result) => {
          const gameStats = result.child("gameStats");
          const prevStat: number = gameStats.child(key).val();
          const newStat = prevStat + 1;
          await gameStats.ref.child(key).set(newStat);
        });
    }
  };

  // Finds room by roomID
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

  // Finds room by current user
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

          if (user && (player1 || player2)) {
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

  // Finds user's username
  const findUsername = async (user: string): Promise<string> => {
    const userRef = firebase.database().ref(`users/${user}`);
    const username = await userRef
      .once("value")
      .then(
        (snapshot) => (snapshot.val() && snapshot.val().username) || "Anonymous"
      );
    return username;
  };

  // Removes Error messages for room-status automatically
  useEffect(() => {
    if (roomStatus.errorMsg) {
      setTimeout(() => {
        dispatch({ type: "ERROR", message: false });
      }, 3000);
    }
  }, [roomStatus.errorMsg]);

  return (
    <RoomContext.Provider value={{ roomContext, roomStatus, roomState }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
