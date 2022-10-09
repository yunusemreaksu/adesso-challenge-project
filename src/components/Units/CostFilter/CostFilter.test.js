import { render, screen } from "@testing-library/react";
import CostFilter from "./CostFilter";

test("renders checkbox", () => {
  render(<CostFilter />);
  const checkbox = screen.getAllByRole("checkbox");

  expect(checkbox.checked).toEqual(undefined);
});
