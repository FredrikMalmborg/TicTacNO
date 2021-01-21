import React from "react";
import fb from "firebase";
import { TCellState } from "../../components/game/cell/cell";

export interface IRoomState {
  rid: string | undefined;
  open: boolean;
  player1: { id: string | null; displayName: string } | null;
  player2: { id: string | null; displayName: string } | null;
  gameStarted: boolean;
  gameBoard: TCellState[][] | undefined;
}

export const INITIAL_ROOM: IRoomState = {
  rid: undefined,
  open: false,
  player1: null,
  player2: null,
  gameStarted: false,
  gameBoard: undefined,
};

interface IRoomStatus {
  loading: boolean;
  errorMsg: string | false;
  success: boolean;
  roomKey: string | undefined;
}

export const INITIAL_ROOM_STATUS: IRoomStatus = {
  loading: false,
  errorMsg: false,
  success: false,
  roomKey: undefined,
};

export const INITIAL_BOARD: TCellState[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

type TStatusAction =
  | { type: "ERROR"; message: string | false }
  | { type: "LOADING"; isLoading: boolean }
  | { type: "SUCCESS"; roomKey: string }
  | { type: "RESET" };

export const roomStatusReducer = (
  prevState: IRoomStatus,
  action: TStatusAction
) => {
  switch (action.type) {
    case "ERROR": {
      return {
        ...prevState,
        errorMsg: action.message,
        success: false,
        roomKey: undefined,
      } as IRoomStatus;
    }
    case "LOADING": {
      return {
        ...prevState,
        loading: action.isLoading,
      } as IRoomStatus;
    }
    case "SUCCESS": {
      return {
        ...prevState,
        errorMsg: false,
        success: true,
        roomKey: action.roomKey,
      } as IRoomStatus;
    }
    case "RESET": {
      return {
        ...prevState,
        errorMsg: false,
        success: false,
        roomKey: undefined,
        loading: false,
      } as IRoomStatus;
    }
  }
};

const RoomContext = React.createContext({
  roomContext: {
    hostRoom: () => {},
    destroyRoom: () => {},
    joinRoom: (roomId: string) => {},
    checkForOngoingGame: async (): Promise<
      undefined | { room: fb.database.DataSnapshot; host: boolean }
    > => Promise.resolve(undefined),
    reconnectToOngoing: (room: fb.database.DataSnapshot) => {},
    startGame: () => {},
    resetRoomStatus: () => {},
    leaveRoom: () => {},
  },
  roomStatus: INITIAL_ROOM_STATUS,
  room: INITIAL_ROOM,
});

export default RoomContext;
