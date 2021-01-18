import React, { memo, useEffect, useMemo, useReducer, useState } from "react";
import { Grid, Row } from "react-native-easy-grid";
import { gameState, INITIAL_GAME_STATE } from "./gameController";
import Cell, { TCellState, TCellPos } from "../cell/cell";
import { availableCells as ACells, board } from "./DEFAULT_BOARD";
import cell from "../cell/cell";
import { idText } from "typescript";

const Board = () => {

  const [game, dispatch] = useReducer(gameState, INITIAL_GAME_STATE);

  useEffect(() => {
    game.board.join("\n")
    const x: any = []
    game.availableCells.forEach(c => {
      x.push(`y:${c.y} x:${c.x}`)
    });
    console.log("Available Cells :", x.length, x);

  }, [game.board]);

  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    let
      newBoard = [...game.board],
      expand = false;

    newBoard[y][x] = state;
    console.log("CLICKED : ", y, x);

    // checkWin(newBoard, { y, x })

    const voidedCells: TCellState[] = Array()
      .concat(...game.board)
      .filter((x) => x === 0 || x === 1);

    const ratio = voidedCells.length / Math.pow(game.board.length, 2);


    if (ratio < 0.5) expand = true

    if (expand) {
      addNewLayer([...newBoard]);
    } else {
      addNewClickableCell([...newBoard]);
    }

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
    newCell: TCellPos,
    newBoard: TCellState[][]
  ) => {
    const omni = [-1, 0, 1];
    const newCells: TCellPos[] = []

    omni.forEach((i) => {
      omni.forEach((j) => {
        if (newBoard[newCell.y + i] !== undefined) {
          if (newBoard[newCell.y + i][newCell.x + j] !== undefined) {
            if (
              (i !== 0 || j !== 0) &&
              newBoard[newCell.y + i][newCell.x + j] === 0
            ) {
              console.log(newCell.y + i, newCell.x + j);
              newBoard[newCell.y + i][newCell.x + j] = 1;
              newCells.push({ y: newCell.y + i, x: newCell.x + j })
            }
          }
        }
      });
    });

    const x: string[] = []
    newCells.forEach(c => {
      x.push(`y:${c.y} x:${c.x}`)
    });

    console.log("NewCell :", `y:${newCell.y} x:${newCell.x}`);
    console.log("NewCells : ", x.length, x);

    dispatch({ type: "UPDATE_AVAILABLECELLS", payload: { add: newCells, remove: newCell } })
    // dispatch({ type: "REMOVE_AVAILABLECELL", cell: cellPosition })
    // dispatch({ type: "ADD_AVAILABLECELLS", cells: newCells })

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

  const addNewClickableCell = (newBoard: TCellState[][], altCells?: TCellPos[]) => {
    const newCell = altCells ? altCells[getRng(altCells.length)] : game.availableCells[getRng(game.availableCells.length)];

    newBoard[newCell.y][newCell.x] = 2;

    updateValidPositions(newCell, newBoard);
  };

  const addNewLayer = (updatedBoard: TCellState[][]) => {
    console.log("EXPAND");
    const layer: TCellState[] = [];
    for (let i = 0; i < game.board.length; i++) {
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

    console.log(updatedBoard.join("\n"));

    const cells = getAllAvailableCells(updatedBoard);
    const x: string[] = []
    cells.forEach(c => {
      x.push(`y:${c.y} x:${c.x}`)
    });

    console.log("newly fetched CELLS : ", x.length, x);

    if (cells) addNewClickableCell(updatedBoard, cells)
    if (updatedBoard.length === updatedBoard[0].length) dispatch({ type: "UPDATE_BOARD", updatedBoard })
    // return updatedBoard;
  };

  return (
    <Grid
      style={{
        flex: 0,
        borderWidth: 3,
        borderColor: "purple",
      }}
    >
      {[...game.board].map((row, rowIndex) => (
        <Row style={{ height: 40 }} key={`row-${rowIndex}`}>
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
  );
};

export default memo(Board);
