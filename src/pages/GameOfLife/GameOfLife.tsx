import React, { useState, useEffect, useCallback } from "react";
import { BOARD_SIZE } from "../../constants";
import { Board } from "../../types";
import { generateEmptyBoard, getNextBoardState } from "../../utils/utils";
import Cell from "../../components/Cell/Cell";
import { throttle } from "lodash";

const GameOfLife: React.FC = () => {
  const [board, setBoard] = useState<Board>(generateEmptyBoard());
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed] = useState(1000);
  const [steps, setSteps] = useState(1);

  const toggleCellState = useCallback((x: number, y: number) => {
    setBoard((prevBoard) =>
      prevBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === x && colIndex === y) {
            return !cell;
          }
          return cell;
        })
      )
    );
  }, []);

  const nextState = throttle(() => {
    setBoard((prevBoard) => getNextBoardState(prevBoard));
  }, 100); // Only allow it to be called every 100ms

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const advanceXSteps = () => {
    let newBoard = board;
    for (let i = 0; i < steps; i++) {
      newBoard = getNextBoardState(newBoard);
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        nextState();
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleCellState(rowIndex, colIndex)}
              isAlive={cell}
            />
          ))
        )}
      </div>

      <button onClick={nextState}>Next State</button>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <input
        type="number"
        value={steps}
        onChange={(e) => setSteps(Number(e.target.value))}
      />
      <button onClick={advanceXSteps}>Advance {steps} Steps</button>
    </div>
  );
};

export default GameOfLife;
