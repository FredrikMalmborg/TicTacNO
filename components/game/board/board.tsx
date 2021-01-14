import React, { memo, useEffect, useMemo, useState } from "react";
import { Grid, Row } from "react-native-easy-grid";
import Cell, { TCellState, TCellPos } from "../cell/cell";


const Board = ({ ...props }) => {
  useMemo
  const board: TCellState[][] = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];


  const [gameBoard, setGameBoard] = useState<TCellState[][]>(board);

  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    let newBoard = [...gameBoard];
    newBoard[y][x] = state;
    setGameBoard(newBoard);
    addNewClickableCell()
  };

  // useEffect(() => {
  //   if (gameBoard !== board) {
  //     setGameBoard(board);
  //   }
  // }, [board]);

  const addNewLayer = () => {
    let x = [].concat(...gameBoard).filter(x => x === 0).length / (Math.pow(gameBoard.length, 2) / 2); // Does more than halv the board contain voided out cells ?

    console.log(x);
    if (x < .8) {
      console.log("EXPAND");
      let newBoard = [...gameBoard];
      console.log(newBoard.join('\n'));

      const layer: TCellState[] = Array.from(Array(newBoard.length + 2), () => 0)
      console.log(layer, layer.length, newBoard.length);


      newBoard.forEach(row => {
        row.push(0)
        row.unshift(0)
      });
      newBoard.push(layer)
      newBoard.unshift(layer)


      // veritcaly()
      // horrizontaly()
      console.log(newBoard.join('\n'));

      setGameBoard(newBoard)

    }

  }

  const getRng = () => Math.floor(Math.random() * board.length)

  const checkValidPosition = (y: number, x: number) => {
    let z: any = []
    const omni = [-1, 0, 1]
    console.log(y, x);
    omni.forEach(i => {
      if (gameBoard[y + i]) {
        omni.forEach(j => {
          z.push(gameBoard[y + i][x + j])
        });
      }
    });

    console.log(z.join(''));

    if (z.includes(1) || z.includes(2) || z.includes(3)) return true
    return false
  }

  const addNewClickableCell = () => {
    let newBoard = [...gameBoard];
    const
      x = getRng(),
      y = getRng()

    if (newBoard[y][x] === 0) {
      if (checkValidPosition(y, x)) {
        newBoard[y][x] = 1
        setGameBoard(newBoard)
        addNewLayer()
        console.log("-----------------------");
      } else {
        addNewClickableCell()
      }
    }
    else {
      addNewClickableCell()
    }

  }

  return (
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
  );
};

export default memo(Board);
