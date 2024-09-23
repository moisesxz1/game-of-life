import { render, screen, fireEvent } from "@testing-library/react";
import GameOfLife from "./GameOfLife";

describe("GameOfLife Component", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(<GameOfLife />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the grid with cells", () => {
    render(<GameOfLife />);
    const gridSize = 400;

    // Check if grid cells are rendered
    const cells = screen.getAllByTestId("cell");
    expect(cells.length).toBe(gridSize);
  });

  it("toggles cell state when clicked", () => {
    render(<GameOfLife />);

    const cell = screen.getAllByTestId("cell")[0];

    expect(cell).toHaveClass("cell is-dead");

    fireEvent.click(cell);

    // Cell should now be alive (black background)
    expect(cell).toHaveClass("cell is-alive");
  });

  it("Should start and stop the game when play/pause is clicked", () => {
    jest.useFakeTimers();

    render(<GameOfLife />);

    const playButton = screen.getByText("Play");
    fireEvent.click(playButton);

    expect(playButton.textContent).toBe("Pause");

    jest.advanceTimersByTime(1000);

    // Assuming the game updates the board state every second, check if the board has changed
    const cells = screen.getAllByTestId("cell");
    const firstCell = cells[0];

    jest.advanceTimersByTime(1000);
    expect(firstCell).toHaveClass("cell is-dead");

    fireEvent.click(playButton);
    expect(playButton.textContent).toBe("Play");

    jest.clearAllTimers();
  });
});
