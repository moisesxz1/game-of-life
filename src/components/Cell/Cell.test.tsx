import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

const mockedOnClickFunction = jest.fn();

describe("Cell Component", () => {
  it("Matches the snapshot", () => {
    const { asFragment } = render(
      <Cell isAlive={false} onClick={mockedOnClickFunction} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Applies is-alive class when isAlive is true", () => {
    const { container } = render(<Cell isAlive={true} onClick={() => {}} />);
    expect(container.firstChild).toHaveClass("is-alive");
  });

  test("Calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Cell isAlive={false} onClick={handleClick} />
    );

    const cell = getByTestId("cell");
    cell.click();

    expect(handleClick).toHaveBeenCalled();
  });

  test("matches snapshot when dead", () => {
    const { asFragment } = render(<Cell isAlive={false} onClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
