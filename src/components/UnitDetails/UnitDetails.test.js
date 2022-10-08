import { render, screen } from "@testing-library/react";
import UnitDetails from "./UnitDetails";

describe("renders header", () => {
  test("renders header", () => {
    render(<UnitDetails />);

    const headerText = screen.getByText("Unit Details Page");
    expect(headerText).toBeInTheDocument();
  });
});
