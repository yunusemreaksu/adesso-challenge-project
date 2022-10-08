import { render, screen } from "@testing-library/react";
import AgeFilter from "./AgeFilter";

describe("renders header", () => {
  test("renders header", () => {
    render(<AgeFilter />);
    
    const headerText = screen.getByText(/ages/i);
    expect(headerText).toBeInTheDocument();
  });
});

describe("renders button names", () => {
  test("renders 'All' name", () => {
    render(<AgeFilter />);

    const allText = screen.getByText("All");
    expect(allText).toBeInTheDocument();
  });
  test("renders 'Dark' name", () => {
    render(<AgeFilter />);

    const darkText = screen.getByText("Dark");
    expect(darkText).toBeInTheDocument();
  });
  test("renders 'Feudal' name", () => {
    render(<AgeFilter />);

    const feudalText = screen.getByText("Feudal");
    expect(feudalText).toBeInTheDocument();
  });
  test("renders 'Castle' name", () => {
    render(<AgeFilter />);

    const castleText = screen.getByText("Castle");
    expect(castleText).toBeInTheDocument();
  });
  test("renders 'Imperial' name", () => {
    render(<AgeFilter />);

    const imperialText = screen.getByText("Imperial");
    expect(imperialText).toBeInTheDocument();
  });
});
