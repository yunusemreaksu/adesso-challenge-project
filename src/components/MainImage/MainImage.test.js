import { render, screen } from "@testing-library/react";
import MainImage from "./MainImage";

test("renders image", () => {
  render(<MainImage />);

  expect(screen.getByRole("img")).toBeInTheDocument();
});
