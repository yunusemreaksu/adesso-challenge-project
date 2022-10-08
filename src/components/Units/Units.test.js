import { render, screen } from "@testing-library/react";
import Units from "./Units";

describe("async items", () => {
  test("renders data if request succeeds", async () => {
    render(<Units />);

    const cellElements = await screen.findAllByRole("cell");
    expect(cellElements).not.toHaveLength(0);
  });
});
