import { availableCells as AC, board } from "./DEFAULT_BOARD";
import { TCellPos, TCellState } from "../cell/cell";

export interface IGameState {
    winner: false | { name: string },
    board: TCellState[][],
    availableCells: TCellPos[]
}

export const INITIAL_GAME_STATE: IGameState = {
    winner: false,
    board: board,
    availableCells: AC
};

type TReducerAction =
    | { type: "WINNER"; name: string }
    | { type: "REMOVE_AVAILABLECELL"; cell: TCellPos; }
    | { type: "ADD_AVAILABLECELLS"; cells: TCellPos[]; }
    | { type: "SET_AVAILABLECELLS"; cells: TCellPos[]; }
    | { type: "UPDATE_BOARD"; updatedBoard: TCellState[][] }

export const gameState = (prevState: IGameState, action: TReducerAction) => {
    switch (action.type) {
        case "WINNER": return {
            ...prevState,
            board: INITIAL_GAME_STATE.board,
            winner: { name: action.name }
        } as IGameState;

        case "REMOVE_AVAILABLECELL":
            let updatedRemove = [...prevState.availableCells]
            if (action.cell) updatedRemove.splice(prevState.availableCells.indexOf(action.cell), 1)

            return {
                ...prevState,
                availableCells: updatedRemove
            } as IGameState;

        case "ADD_AVAILABLECELLS":
            let updatedAdd = [...prevState.availableCells]
            if (action.cells) updatedAdd.push(...action.cells)

            return {
                ...prevState,
                availableCells: updatedAdd
            } as IGameState;

        case "SET_AVAILABLECELLS":
            return {
                ...prevState,
                availableCells: action.cells
            } as IGameState;

        case "UPDATE_BOARD":
            const updatedBoard = [...action.updatedBoard]

            return {
                ...prevState,
                board: updatedBoard
            } as IGameState
    }
};