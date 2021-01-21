import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Grid, Row } from "react-native-easy-grid";
import { gameState } from "./gameController";
import Cell, { TCellState, TCellPos } from "../cell/cell";

import TicTacText from "../../text/Text";
import { View } from "react-native";
import RoomContext from "../../../contexts/room/room-context";

interface IProps {
  gameBoard: TCellState[][];
  playerState?: 3 | 4;
  yourTurn: boolean;
}

const Board = ({ gameBoard, playerState }: IProps) => {
  // const [game, dispatch] = useReducer(gameState, INITIAL_GAME_STATE);
  const { roomContext } = useContext(RoomContext);

  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    roomContext.updateGameLoser()
    let newBoard = [...gameBoard],
      expand = false;
    newBoard[y][x] = state;

    const loser = checkLoss(newBoard, { y, x });
    // setPlayer(player === 3 ? 4 : 3);

    if (!loser) {
      const voidedCells: TCellState[] = Array()
        .concat(...newBoard)
        .filter((x) => x === 0 || x === 1);

      const ratio = voidedCells.length / Math.pow(newBoard.length, 2);

      if (ratio < 0.5) expand = true;
      if (expand) {
        // newBoard = addNewLayer([...newBoard]);
      } else {
        // newBoard = addNewClickableCell([...newBoard]);
      }

      // Uppdatera Firebase
      roomContext.updateGameBoard(newBoard);
      // dispatch({ type: "UPDATE_BOARD", updatedBoard: newBoard });
    }
  };

  const isLossCell = (array: TCellPos[], y: number, x: number) => {
    return !array.some((c) => c.y === y && c.x === x);
  };

  const checkLoss = (board: TCellState[][], click: TCellPos) => {
    const omni = [-1, 0, 1],
      lossArray: TCellPos[] = [];

    omni.forEach((i) => {
      if (
        board[click.y + i] !== undefined &&
        board[click.y - i] !== undefined
      ) {
        omni.forEach((j) => {
          if (i !== 0 || j !== 0) {
            const f = {
                value: board[click.y + i][click.x + j],
                y: click.y + i,
                x: click.x + j,
              },
              b = {
                value: board[click.y - i][click.x - j],
                y: click.y - i,
                x: click.x - j,
              },
              f2 = {
                value:
                  board[click.y + i * 2] &&
                  board[click.y + i * 2][click.x + j * 2],
                y: click.y + i * 2,
                x: click.x + j * 2,
              },
              b2 = {
                value:
                  board[click.y - i * 2] &&
                  board[click.y - i * 2][click.x - j * 2],
                y: click.y - i * 2,
                x: click.x - j * 2,
              };

            if (f.value === playerState) {
              console.log("found");

              if (f2.value === playerState) {
                console.log("found further");
                isLossCell(lossArray, f2.y, f2.x) &&
                  lossArray.push({ y: f2.y, x: f2.x });
                isLossCell(lossArray, f.y, f.x) &&
                  lossArray.push({ y: f.y, x: f.x });
              }
              if (b.value === playerState) {
                console.log("back");
                isLossCell(lossArray, b.y, b.x) &&
                  lossArray.push({ y: f2.y, x: b.x });
                isLossCell(lossArray, f.y, f.x) &&
                  lossArray.push({ y: f.y, x: f.x });
                if (b2.value === playerState) {
                  console.log("back further");
                  isLossCell(lossArray, b2.y, b2.x) &&
                    lossArray.push({ y: b2.y, x: b2.x });
                  isLossCell(lossArray, f.y, f.x) &&
                    lossArray.push({ y: f.y, x: f.x });
                }
              }
              lossArray.length >= 2 &&
                isLossCell(lossArray, click.y, click.x) &&
                lossArray.push({ y: click.y, x: click.x });
            }
          }
        });
      }
    });

    if (lossArray.length >= 3) {
      // TA SPELAREN FRÅN DATABASEN
      roomContext.updateGameLoser();
      // dispatch({ type: "LOSER" });
      return true;
    }
    return false;
    // console.log("loss cells : ", lossArray.length, lossArray);
  };

  const getRng = (range: number) => Math.floor(Math.random() * range);

  const updateValidPositions = (
    newCell: TCellPos,
    newBoard: TCellState[][]
  ) => {
    const omni = [-1, 0, 1];
    const newAvailableCells: TCellPos[] = [];

    omni.forEach((i) => {
      omni.forEach((j) => {
        if (newBoard[newCell.y + i] !== undefined) {
          if (newBoard[newCell.y + i][newCell.x + j] !== undefined) {
            if (
              (i !== 0 || j !== 0) &&
              newBoard[newCell.y + i][newCell.x + j] === 0
            ) {
              newBoard[newCell.y + i][newCell.x + j] = 1;
              newAvailableCells.push({ y: newCell.y + i, x: newCell.x + j });
            }
          }
        }
      });
    });

    // dispatch({
    //   type: "UPDATE_AVAILABLECELLS",
    //   payload: { remove: newCell, add: newAvailableCells },
    // });
    return newBoard;
    // dispatch({ type: "UPDATE_BOARD", updatedBoard: newBoard });
  };

  const getAllAvailableCells = (B: TCellState[][]) => {
    const cells: any[] = [];

    B.forEach((Y, y) => {
      Y.forEach((_, x) => {
        if (B[y][x] === 1) cells.push({ y, x });
      });
    });

    // dispatch({ type: "SET_AVAILABLECELLS", cells });
    return cells;
  };

  // const addNewClickableCell = (
  //   newBoard: TCellState[][],
  //   altCells?: TCellPos[]
  // ) => {
  //   const newCell = altCells
  //     ? altCells[getRng(altCells.length)]
  //     : game.availableCells[getRng(game.availableCells.length)];
  //   newBoard[newCell.y][newCell.x] = 2;
  //   return updateValidPositions(newCell, newBoard);
  // };

  const addNewLayer = (updatedBoard: TCellState[][]) => {
    const layer: TCellState[] = [];
    for (let i = 0; i < updatedBoard.length; i++) {
      layer.push(0);
    }
    updatedBoard.push([...layer]);
    updatedBoard.unshift([...layer]);

    updatedBoard.forEach((row: number[]) => {
      if (row.length !== updatedBoard.length) {
        if (row.length === 0) {
          for (let i = 0; i < updatedBoard.length; i++) {
            row.push(0);
          }
        } else {
          row.push(0);
          row.unshift(0);
        }
      }
    });

    const cells = getAllAvailableCells(updatedBoard);
    // return addNewClickableCell(updatedBoard, cells);
    // if (updatedBoard.length === updatedBoard[0].length) {
    // dispatch({ type: "UPDATE_BOARD", updatedBoard });
    // }
    // return updatedBoard
  };

  return (
    <Grid
      style={{
        flex: 0,
        borderWidth: 3,
        borderColor: "purple",
      }}
    >
      {gameBoard &&
        playerState &&
        [...gameBoard].map((row, rowIndex) => (
          <Row style={{ height: 40 }} key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <Cell
                player={playerState}
                click={onClickCell}
                pos={{ y: rowIndex, x: colIndex }}
                key={`cell-${rowIndex}/${colIndex}`}
                state={col}
              />
            ))}
          </Row>
        ))}
    </Grid>
  );
};

export default memo(Board);
