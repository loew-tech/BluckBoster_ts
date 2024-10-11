import { screen } from "@testing-library/react";

import { ErrorMessage } from "../errorMessage";
import { renderWithNav } from "../../../test/renderHelpers";

describe("error message", () => {
  it("should render when user is null", async () => {
    renderWithNav(<ErrorMessage msg="hello err" />);
    expect(screen.getByText(/Whoops/)).toBeTruthy();
    expect(screen.getByText("hello err")).toBeTruthy();
  });
});
