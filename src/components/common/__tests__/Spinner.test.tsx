import { render, screen } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner", () => {
  it("renders default loading message", () => {
    render(<Spinner />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders custom loading message", () => {
    render(<Spinner message="Please wait..." />);
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });
});
