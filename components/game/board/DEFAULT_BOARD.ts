import { TCellPos, TCellState } from "../cell/cell";

export const availableCells: TCellPos[] = [
  {
    y: 1,
    x: 1,
  },
  {
    y: 1,
    x: 2,
  },
  {
    y: 1,
    x: 3,
  },
  {
    y: 1,
    x: 4,
  },
  {
    y: 1,
    x: 5,
  },
  {
    y: 2,
    x: 1,
  },
  {
    y: 2,
    x: 5,
  },
  {
    y: 3,
    x: 1,
  },
  {
    y: 3,
    x: 5,
  },
  {
    y: 4,
    x: 1,
  },
  {
    y: 4,
    x: 5,
  },
  {
    y: 5,
    x: 1,
  },
  {
    y: 5,
    x: 2,
  },
  {
    y: 5,
    x: 3,
  },
  {
    y: 5,
    x: 4,
  },
  {
    y: 5,
    x: 5,
  },
];
export const board: TCellState[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
