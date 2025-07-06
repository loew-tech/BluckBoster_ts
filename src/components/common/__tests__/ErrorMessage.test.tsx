import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "../errorMessage";

describe("ErrorMessage", () => {
  it("renders the error message text", () => {
    const errorText = "Something went wrong!";
    render(<ErrorMessage msg={errorText} />);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });

  it("has the correct CSS class", () => {
    const errorText = "Another error!";
    render(<ErrorMessage msg={errorText} />);

    const element = screen.getByText(errorText);
    expect(element).toHaveClass("error-text");
  });
});
