import React from "react";
import "./Cell.css";

const Cell: React.FC<{
  isAlive: boolean;
  onClick: () => void;
}> = React.memo(({ isAlive, onClick }) => {
  return (
    <div
      data-testid="cell"
      className={`cell ${isAlive ? "is-alive" : "is-dead"}`}
      onClick={onClick}
    />
  );
});

export default Cell;
