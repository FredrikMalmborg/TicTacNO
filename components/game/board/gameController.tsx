import { availableCells, board } from "./DEFAULT_BOARD";
import { TCellPos, TCellState } from "../cell/cell";

export interface IGameState {
    winner: false | { name: string },
    board: TCellState[][],
    availableCells: TCellPos[]
}

export const INITIAL_GAME_STATE: IGameState = {
    winner: false,
    board: board,
    availableCells: availableCells
};

type TReducerAction =
    | { type: "WINNER"; name: string }
    | { type: "UPDATE_AVAILABLECELLS"; payload: { remove: TCellPos; add: TCellPos[] } }
    | { type: "UPDATE_BOARD"; updatedBoard: TCellState[][] }


export const gameState = (prevState: IGameState, action: TReducerAction) => {
    switch (action.type) {
        case "WINNER": return {
            ...prevState,
            winner: { name: action.name }
        };
        case "UPDATE_AVAILABLECELLS":
            let updated
            if (action.payload.remove) updated = availableCells.splice(availableCells.indexOf(action.payload.remove), 1, ...action.payload.add)
            else updated = availableCells.push(...action.payload.add)
            return {
                ...prevState,
                availableCells: updated
            };
        case "UPDATE_BOARD":
            return {
                ...prevState,
                board: action.updatedBoard
            }

    }
};