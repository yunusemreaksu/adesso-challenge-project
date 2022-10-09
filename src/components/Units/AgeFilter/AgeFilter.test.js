import { render, screen } from "@testing-library/react";
import AgeFilter from "./AgeFilter";

test("renders buttons", () => {
  render(<AgeFilter />);

  expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
});
