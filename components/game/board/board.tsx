import React, { useState } from "react";
import { Grid, Row } from "react-native-easy-grid";
import Cell, { TCellState, TCellPos } from "../cell/cell";

interface IBoardProps {
  board: TCellState[][];
}

const Board = ({ board, ...props }: IBoardProps) => {
  const [gameBoard, setGameBoard] = useState<TCellState[][]>(board);

  const DEFAULT: TCellState[][] = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];

  const resetBoard = () => {
    setGameBoard(DEFAULT);
  };

  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    let board = [...gameBoard];
    board[y][x] = state;
    // console.log(board);
    setGameBoard(board);
  };

  return (
    <Grid style={{ flex: 0 }}>
      {gameBoard.map((row, rowIndex) => (
        <Row style={{ height: 60 }} key={`row-${rowIndex}`}>
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

export default Board;
