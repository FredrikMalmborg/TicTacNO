import React, { memo, useEffect, useMemo, useReducer, useState } from "react";
import { Grid, Row } from "react-native-easy-grid";
import { gameState, INITIAL_GAME_STATE } from "./gameController";
import Cell, { TCellState, TCellPos } from "../cell/cell";

import TicTacText from "../../text/Text";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamlist } from "../../../pages/page-navigation/PageNavigator";
import { Pages } from "../../../pages/pages";
import { View } from "react-native";

const Board = () => {

  const [game, dispatch] = useReducer(gameState, INITIAL_GAME_STATE);
  const [player, setPlayer] = useState<TCellState>(3);

  useEffect(() => {
    console.log("Player changed to: ", player === 3 ? "RED" : "TEAL");
  }, [player]);


  const onClickCell = ({ y, x }: TCellPos, state: TCellState) => {
    let
      newBoard = [...game.board],
      expand = false;

    newBoard[y][x] = state;
    console.log("CLICKED : ", y, x);

    checkWin(newBoard, { y, x })
    setPlayer(player === 3 ? 4 : 3)

    const voidedCells: TCellState[] = Array()
      .concat(...game.board)
      .filter((x) => x === 0 || x === 1);

    const ratio = voidedCells.length / Math.pow(game.board.length, 2);

    if (ratio < 0.5) expand = true
    if (expand && !game.winner) {
      addNewLayer([...newBoard]);
    } else {
      addNewClickableCell([...newBoard]);
    }

  };

  const isLossCell = (array: TCellPos[], y: number, x: number) => {
    return !array.some(c => c.y === y && c.x === x)
  }

  const checkWin = (board: TCellState[][], click: TCellPos) => {
    const
      omni = [-1, 0, 1],
      lossArray: TCellPos[] = []

    omni.forEach((i) => {
      if (board[click.y + i] !== undefined && board[click.y - i] !== undefined) {
        omni.forEach((j) => {
          if ((i !== 0 || j !== 0)) {
            const
              f = {
                value: board[click.y + i][click.x + j],
                y: click.y + i,
                x: click.x + j
              },
              b = {
                value: board[click.y - i][click.x - j],
                y: click.y - i,
                x: click.x - j
              },
              f2 = {
                value: board[click.y + i * 2] && board[click.y + i * 2][click.x + j * 2],
                y: click.y + i * 2,
                x: click.x + j * 2
              },
              b2 = {
                value: board[click.y - i * 2] && board[click.y - i * 2][click.x - j * 2],
                y: click.y - i * 2,
                x: click.x - j * 2
              }

            if (f.value === player) {
              console.log("found");

              if (f2.value === player) {
                console.log("found further");
                isLossCell(lossArray, f2.y, f2.x) && lossArray.push({ y: f2.y, x: f2.x })
                isLossCell(lossArray, f.y, f.x) && lossArray.push({ y: f.y, x: f.x })
              }
              if (b.value === player) {
                console.log("back");
                isLossCell(lossArray, b.y, b.x) && lossArray.push({ y: f2.y, x: b.x })
                isLossCell(lossArray, f.y, f.x) && lossArray.push({ y: f.y, x: f.x })
                if (b2.value === player) {
                  console.log("back further");
                  isLossCell(lossArray, b2.y, b2.x) && lossArray.push({ y: b2.y, x: b2.x })
                  isLossCell(lossArray, f.y, f.x) && lossArray.push({ y: f.y, x: f.x })
                }
              }
              lossArray.length >= 2 && isLossCell(lossArray, click.y, click.x) && lossArray.push({ y: click.y, x: click.x });
            }
          }
        });
      }
    });

    if (lossArray.length >= 3) dispatch({ type: "WINNER", name: player === 3 ? "4" : "3" })

    console.log("loss cells : ", lossArray.length, lossArray);
  }

  const getRng = (range: number) => Math.floor(Math.random() * range);

  const updateValidPositions = (
    newCell: TCellPos,
    newBoard: TCellState[][]
  ) => {
    const omni = [-1, 0, 1];
    const newAvailableCells: TCellPos[] = []

    omni.forEach((i) => {
      omni.forEach((j) => {
        if (newBoard[newCell.y + i] !== undefined) {
          if (newBoard[newCell.y + i][newCell.x + j] !== undefined) {
            if (
              (i !== 0 || j !== 0) &&
              newBoard[newCell.y + i][newCell.x + j] === 0
            ) {
              newBoard[newCell.y + i][newCell.x + j] = 1;
              newAvailableCells.push({ y: newCell.y + i, x: newCell.x + j })
            }
          }
        }
      });
    });

    dispatch({ type: "UPDATE_AVAILABLECELLS", payload: { remove: newCell, add: newAvailableCells } })
    // dispatch({ type: "REMOVE_AVAILABLECELL", cell: newCell })
    // dispatch({ type: "ADD_AVAILABLECELLS", cells: newAvailableCells })
    dispatch({ type: "UPDATE_BOARD", updatedBoard: newBoard })
  };

  const getAllAvailableCells = (B: TCellState[][]) => {
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

    const cells = getAllAvailableCells(updatedBoard);
    if (cells) addNewClickableCell(updatedBoard, cells)
    if (updatedBoard.length === updatedBoard[0].length) dispatch({ type: "UPDATE_BOARD", updatedBoard })
  };

  return (
    game.winner ?
      <View>
        <TicTacText label={`Winner is : ${game.winner.name === "3" ? "Red" : "Teal"}`} />
      </View>
      :
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
                player={player}
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
