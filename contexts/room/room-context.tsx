import React from "react";
import fb from "firebase";
import { TCellPos, TCellState } from "../../components/game/cell/cell";
import { INITIAL_ACELLS } from "../../components/game/board/DEFAULT_BOARD";

export type TPlayer = { id: string | null; displayName: string; cellId: 3 | 4 };
export interface IRoomState {
  rid: string | undefined;
  open: boolean;
  player1: TPlayer | null;
  player2: TPlayer | null;
  playerTurn: TPlayer | null;
  losingPlayer: TPlayer | null;
  gameStarted: boolean;
  gameBoard: TCellState[][] | undefined;
  availableCells: TCellPos[];
}

export const INITIAL_BOARD: TCellState[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export const INITIAL_ROOM: IRoomState = {
  rid: undefined,
  open: false,
  player1: null,
  player2: null,
  playerTurn: null,
  losingPlayer: null,
  gameStarted: false,
  gameBoard: INITIAL_BOARD,
  availableCells: INITIAL_ACELLS,
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
    resetRoomStatus: () => {},
    leaveRoom: () => {},
    startGame: () => {},
    updateGameState: (board: TCellState[][], aCells: TCellPos[]) => {},
    updateGameLoser: (board: TCellState[][]) => {},
  },
  roomStatus: INITIAL_ROOM_STATUS,
  roomState: INITIAL_ROOM,
});

export default RoomContext;
