import { BOARD_SIZE } from "../constants";
import { Board } from "../types";

export const generateEmptyBoard = (): Board => {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => false)
  );
};

//This function is in charge of counting wich of the 8 adjacent neighbors are alive for each cell
export const countNeighbors = (board: Board, x: number, y: number): number => {
  const rows = board.length;
  const cols = board[0].length;
  let count = 0;

  // Iterate through the 8 neighboring cells around (x, y)
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const neighborX = x + i;
      const neighborY = y + j;

      // Boundary check to ensure we don't go out of bounds
      if (
        neighborX >= 0 &&
        neighborX < rows &&
        neighborY >= 0 &&
        neighborY < cols
      ) {
        if (board[neighborX][neighborY]) {
          count++;
        }
      }
    }
  }

  return count;
};

export const getNextBoardState = (board: Board): Board => {
  return board.map((row, x) =>
    row.map((cell, y) => {
      const aliveNeighbors = countNeighbors(board, x, y);
      if (cell) {
        return aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        return aliveNeighbors === 3;
      }
    })
  );
};
