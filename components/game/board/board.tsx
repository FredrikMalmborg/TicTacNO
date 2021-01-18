import React, { memo, useEffect, useMemo, useReducer, useState } from "react";
import { Grid, Row } from "react-native-easy-grid";
import { gameState, INITIAL_GAME_STATE } from "./gameController";
import Cell, { TCellState, TCellPos } from "../cell/cell";
import { availableCells as ACells, board } from "./DEFAULT_BOARD";

const Board = () => {

  const [game, dispatch] = useReducer(gameState, INITIAL_GAME_STATE);

  const [gameBoard, setGameBoard] = useState<TCellState[][]>(board);
  const [winnerStatus, setWinnerStatus] = useState<false | { winner: string }>(false);

  useEffect(() => {
    console.log(game.board.join("\n"));
    console.log(game.availableCells.length);

  }, [game.board]);

  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    let
      newBoard = [...game.board],
      expanded = false;

    newBoard[y][x] = state;
    console.log("CLICKED : ", y, x);

    // checkWin(newBoard, { y, x })

    const voidedCells: TCellState[] = Array()
      .concat(...gameBoard)
      .filter((x) => x === 0);

    if (expanded) {
      addNewLayer([...newBoard]);
      getAllAvailableCells(newBoard);
    }


    addNewClickableCell(newBoard);

  };

  const checkWin = (board: TCellState[][], click: TCellPos) => {
    const player = 3
    const omni = [-1, 0, 1];
    const lossArray: TCellPos[] = []

    omni.forEach((i) => {
      omni.forEach((j) => {
        if (i !== 0 || j !== 0) {
          if (board[click.y + i][click.x + j] === player) {
            console.log("player : ",
              click.y + i,
              click.x + j);
            console.log("further :", {
              y: click.y + i * 2,
              x: click.x + j * 2
            });
            console.log("back :", {
              y: click.y - i,
              x: click.x - j
            });

            if (board[click.y + i * 2][click.x + j * 2] === player) lossArray.push({ y: click.y + i * 2, x: click.x + j * 2 })
            if (board[click.y - i][click.x - j] === player) lossArray.push({ y: click.y - i, x: click.x - j })
          }
        }
      });
    });

    console.log(lossArray.length, lossArray);


    if (lossArray.length > 1) return true
    return false
  }

  const getRng = (range: number) => Math.floor(Math.random() * range);

  const updateValidPositions = (
    cellPosition: TCellPos,
    newBoard: TCellState[][]
  ) => {
    const omni = [-1, 0, 1];
    const newCells: TCellPos[] = []

    omni.forEach((i) => {
      omni.forEach((j) => {
        if (newBoard[cellPosition.y + i] !== undefined) {
          if (newBoard[cellPosition.y + i][cellPosition.x + j] !== undefined) {
            if (
              (i !== 0 || j !== 0) &&
              newBoard[cellPosition.y + i][cellPosition.x + j] === 0
            ) {
              console.log(cellPosition.y + i, cellPosition.x + j);
              newBoard[cellPosition.y + i][cellPosition.x + j] = 1;
              newCells.push({ y: cellPosition.y + i, x: cellPosition.x + j })
            }
          }
        }
      });
    });

    dispatch({ type: "REMOVE_AVAILABLECELL", cell: cellPosition })
    dispatch({ type: "ADD_AVAILABLECELLS", cells: newCells })
    dispatch({ type: "UPDATE_BOARD", updatedBoard: newBoard })

  };

  const getAllAvailableCells = (B: TCellState[][]) => {
    game.board
    const cells: any[] = [];
    B.forEach((Y, y) => {
      Y.forEach((_, x) => {
        if (B[y][x] === 1) cells.push({ y, x });
      });
    });

    dispatch({ type: "SET_AVAILABLECELLS", cells })
    return cells;
  };

  // const checkForNewAvailableCells = (newCell: { y: number, x: number }) => {
  //   const potentialNewCells: any = checkValidPosition(newCell, true)
  //   const newCells: any = []

  //   potentialNewCells.forEach((cell: any) => {
  //     if (!availableCells.includes(cell)) {
  //       newCells.push(cell)
  //   });

  //   availableCells.splice(availableCells.indexOf(newCell), 1, ...newCells)
  //   return availableCells
  // }

  // const getAvailableCells = (newCell: { y: number, x: number }) => {
  //   const newCells = updateValidPositions(newCell)

  //   availableCells.splice(availableCells.indexOf(newCell), 1, ...newCells)
  //   console.log("Available cells :", availableCells.length);

  //   return availableCells
  // }

  const addNewClickableCell = (
    newBoard: TCellState[][]
  ) => {
    const newCell = game.availableCells[getRng(game.availableCells.length)];
    console.log("newcell :", newCell.y, newCell.x);
    newBoard[newCell.y][newCell.x] = 2;

    return updateValidPositions(newCell, newBoard);
  };

  const addNewLayer = (updatedBoard: TCellState[][]) => {
    console.log("EXPAND");
    const layer: TCellState[] = [];
    for (let i = 0; i < gameBoard.length; i++) {
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
    // console.log("OLD", getAllAvailableCells(newBoard));
    dispatch({ type: "UPDATE_BOARD", updatedBoard })
    return updatedBoard;
  };

  return (
    <>
      <Grid
        style={{
          flex: 0,
          borderWidth: 3,
          borderColor: "purple",
        }}
      >
        {[...gameBoard].map((row, rowIndex) => (
          <Row style={{ height: 58 }} key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <Cell
                click={onClickCell}
                pos={{ y: rowIndex, x: colIndex }}
                key={`cell-${rowIndex}/${colIndex}`}
                state={col}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </>
  );
};

export default memo(Board);
