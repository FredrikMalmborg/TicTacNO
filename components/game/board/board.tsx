import React, { useState } from "react";
import { Grid, Row } from "react-native-easy-grid";
import Cell, { TCellState } from "../cell/cell";

interface IBoardProps {
  board: TCellState[][];
}

const Board = ({ board, ...props }: IBoardProps) => {
  const [gameBoard, setGameBoard] = useState<TCellState[][]>(board);
  return (
    <Grid style={{ flex: 0 }}>
      {gameBoard.map((row, rowIndex) => (
        <Row style={{ height: 60 }} key={`row-${rowIndex}`}>
          {row.map((col, colIndex) => (
            <Cell key={`cell-${rowIndex}/${colIndex}`} state={col} />
          ))}
        </Row>
      ))}
    </Grid>
  );
};

export default Board;
