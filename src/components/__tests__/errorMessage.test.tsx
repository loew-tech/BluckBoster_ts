import { screen } from "@testing-library/react";

import { ErrorMessage } from "../common/errorMessage";
import { renderWithNav } from "../../../test/renderHelpers";

describe("error message", () => {
  it("should render with message", () => {
    renderWithNav(<ErrorMessage msg="hello err" />);
    expect(screen.getByText(/Whoops/)).toBeTruthy();
    expect(screen.getByText("hello err")).toBeTruthy();
  });
});
