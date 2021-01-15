import React, { memo, useEffect, useMemo, useState } from "react";
import { Button } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import Cell, { TCellState, TCellPos } from "../cell/cell";
import { availableCells as ACells, board } from "./DEFAULT_BOARD";

const Board = ({ ...props }) => {
  const [gameBoard, setGameBoard] = useState<TCellState[][]>(board);
  // const [availableCells, setAvailableCells] = useState<TCellPos[]>(ACells);

  // const board: TCellState[][] = [
  //   [0, 0, 0, 0, 0],
  //   [0, 1, 1, 1, 0],
  //   [0, 1, 1, 1, 0],
  //   [0, 1, 1, 1, 0],
  //   [0, 0, 0, 0, 0],
  // ];

  useEffect(() => {
    console.log(gameBoard.join("\n"));
  }, [gameBoard]);

  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    const expanded = true;
    let newBoard = [...gameBoard],
      availableCells = ACells;

    newBoard[y][x] = state;

    const voidedCells: TCellState[] = Array()
      .concat(...gameBoard)
      .filter((x) => x === 0);

    if (expanded) {
      newBoard = addNewLayer([...newBoard]);
      availableCells = getOldAvailableCells(newBoard);
    }

    newBoard = addNewClickableCell(newBoard, availableCells);

    setGameBoard(newBoard);
  };

  const getRng = (range: number) => Math.floor(Math.random() * range);

  const updateValidPositions = (
    cellPosition: { y: number; x: number },
    newBoard: TCellState[][]
  ) => {
    const omni = [-1, 0, 1];
    // const array: TCellPos[] = []

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
            }
          }
        }
      });
    });

    return newBoard;
  };

  const getOldAvailableCells = (B: TCellState[][]) => {
    const potentialCells: any[] = [];
    B.forEach((Y, y) => {
      Y.forEach((_, x) => {
        if (B[y][x] === 1) potentialCells.push({ y, x });
      });
    });

    return potentialCells;
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
    newBoard: TCellState[][],
    availableCells: TCellPos[]
  ) => {
    const newCell = availableCells[getRng(availableCells.length)];
    console.log("newcell :", newCell.y, newCell.x);
    newBoard[newCell.y][newCell.x] = 2;

    const newCellLocations = updateValidPositions(newCell, newBoard);
    return newCellLocations;
  };

  const addNewLayer = (newBoard: TCellState[][]) => {
    console.log("EXPAND");
    const layer: TCellState[] = [];
    for (let i = 0; i < gameBoard.length; i++) {
      layer.push(0);
    }
    newBoard.push(layer);
    newBoard.unshift(layer);

    newBoard.forEach((row: number[]) => {
      if (row.length !== newBoard.length) {
        if (row.length === 0) {
          for (let i = 0; i < newBoard.length; i++) {
            row.push(0);
          }
        } else {
          row.push(0);
          row.unshift(0);
        }
      }
    });
    console.log("OLD", getOldAvailableCells(newBoard));

    return newBoard;
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
