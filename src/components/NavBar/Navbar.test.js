import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("renders links name", () => {
  test("renders 'home' link name", () => {
    render(<Navbar />);

    const homeText = screen.getByText(/home/i);
    expect(homeText).toBeInTheDocument();
  });
  test("renders 'units' link name", () => {
    render(<Navbar />);

    const homeText = screen.getByText(/units/i);
    expect(homeText).toBeInTheDocument();
  });
});
