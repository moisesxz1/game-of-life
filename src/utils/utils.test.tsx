import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { countNeighbors, getNextBoardState } from "./utils";

describe("Utils file tests", () => {
  it("should correctly count live neighbors for a cell in the middle of the grid", () => {
    const board = [
      [false, true, false],
      [true, true, false],
      [false, false, false],
    ];
    const result = countNeighbors(board, 1, 1);
    expect(result).toBe(2); // The cell at (1, 1) has 2 live neighbors
  });

  it("should correctly count live neighbors for a top-left corner cell", () => {
    const board = [
      [true, false, false],
      [false, true, false],
      [false, false, false],
    ];
    const result = countNeighbors(board, 0, 0);
    expect(result).toBe(1); // The top-left corner cell has 1 live neighbor
  });

  it("should correctly count live neighbors for a left edge cell", () => {
    const board = [
      [false, false, false],
      [true, false, false],
      [true, true, false],
    ];
    const result = countNeighbors(board, 1, 0);
    expect(result).toBe(2); // The left edge cell has 2 live neighbors
  });

  it("should return the correct count when all neighbors are alive", () => {
    const board = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    const result = countNeighbors(board, 1, 1);
    expect(result).toBe(8); // The middle cell has 8 live neighbors
  });

  it("should return 0 for a cell in an empty grid", () => {
    const board = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const result = countNeighbors(board, 1, 1);
    expect(result).toBe(0); // No live neighbors
  });

  it("should return the same board for a block pattern (still life)", () => {
    const board = [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(board);
  });

  it("should return the next state for a blinker pattern (oscillator)", () => {
    const board = [
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ];

    const expectedNextBoard = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(expectedNextBoard);
  });

  it("should correctly calculate the next state for a top-left corner cell", () => {
    const board = [
      [true, false, false],
      [false, true, false],
      [false, false, false],
    ];

    const expectedNextBoard = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(expectedNextBoard); // All cells should die
  });

  it("should correctly calculate the next state for a left-side edge cell", () => {
    const board = [
      [false, true, false],
      [true, true, false],
      [false, false, false],
    ];

    const expectedNextBoard = [
      [true, true, false],
      [true, true, false],
      [false, false, false],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(expectedNextBoard); // The left-side cells should stabilize into a block
  });

  it("should return an empty grid for the next state of an empty grid", () => {
    const board = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(board); // An empty grid remains empty
  });

  it("should return an empty grid due to overpopulation in a fully populated grid", () => {
    const board = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];

    const expectedNextBoard = [
      [true, false, true],
      [false, false, false],
      [true, false, true],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(expectedNextBoard); // All inner cells die due to overpopulation
  });

  it("should kill a cell due to loneliness (fewer than 2 neighbors)", () => {
    const board = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];

    const expectedNextBoard = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    const nextBoard = getNextBoardState(board);
    expect(nextBoard).toEqual(expectedNextBoard); // The single cell should die
  });
});
