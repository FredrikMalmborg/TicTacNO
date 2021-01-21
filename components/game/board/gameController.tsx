// import { availableCells as AC, board } from "./DEFAULT_BOARD";
import { TCellPos, TCellState } from "../cell/cell";

export interface IGameState {
  winner: false | { name: string };
  board: TCellState[][] | undefined;
  availableCells: TCellPos[];
}

// export const INITIAL_GAME_STATE: IGameState = {
//   winner: false,
//   board: undefined,
//   // availableCells: AC,
// };

type TReducerAction =
  | { type: "WINNER"; name: string }
  | {
      type: "UPDATE_AVAILABLECELLS";
      payload: { add: TCellPos[]; remove: TCellPos };
    }
  | { type: "REMOVE_AVAILABLECELL"; cell: TCellPos }
  | { type: "ADD_AVAILABLECELLS"; cells: TCellPos[] }
  | { type: "SET_AVAILABLECELLS"; cells: TCellPos[] };
// | { type: "UPDATE_BOARD"; updatedBoard: TCellState[][] };

export const gameState = (prevState: IGameState, action: TReducerAction) => {
  switch (action.type) {
    case "WINNER":
      return {
        ...prevState,
        winner: { name: action.name },
      } as IGameState;

    case "UPDATE_AVAILABLECELLS":
      let updated = [...prevState.availableCells];

      if (action.payload.remove)
        updated.splice(
          updated.indexOf(action.payload.remove),
          1,
          ...action.payload.add
        );
      else updated.push(...action.payload.add);

      return {
        ...prevState,
        availableCells: updated,
      } as IGameState;

    case "REMOVE_AVAILABLECELL":
      let updatedRemove = [...prevState.availableCells];
      if (action.cell)
        updatedRemove.splice(prevState.availableCells.indexOf(action.cell), 1);

      return {
        ...prevState,
        availableCells: updatedRemove,
      } as IGameState;

    case "ADD_AVAILABLECELLS":
      let updatedAdd = [...prevState.availableCells];
      if (action.cells) updatedAdd.push(...action.cells);

      return {
        ...prevState,
        availableCells: updatedAdd,
      } as IGameState;

    case "SET_AVAILABLECELLS":
      return {
        ...prevState,
        availableCells: action.cells,
      } as IGameState;

    // case "UPDATE_BOARD":
    //   const updatedBoard = [...action.updatedBoard];
    //   console.log("DISPATCHED : \n\n", updatedBoard.join("\n"));

    //   return {
    //     ...prevState,
    //     board: updatedBoard,
    //   } as IGameState;
  }
};
