import React from "react";

export interface IRoomState {
  rid: string | undefined;
  open: boolean;
  player1: { id: string | null; displayName: string } | null;
  player2: { id: string | null; displayName: string } | null;
  gameStarted: boolean;
}

export const INITIAL_ROOM: IRoomState = {
  rid: undefined,
  open: false,
  player1: null,
  player2: null,
  gameStarted: false,
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
    resetRoomStatus: () => {},
    leaveRoom: () => {},
  },
  roomStatus: INITIAL_ROOM_STATUS,
  room: INITIAL_ROOM,
});

export default RoomContext;
