import { screen } from "@testing-library/react";

import { MovieTableHeader } from "../movieTableHeader";
import { renderWithNav } from "../../../test/renderHelpers";
import { testCart, testMember } from "../../../test/test-data";

describe("error message", () => {
  it("should render when user is null", () => {
    renderWithNav(<MovieTableHeader user={null} cart={testCart} />);
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.queryByText("Rented")).toBeFalsy();
  });
  it("should render when user info", () => {
    renderWithNav(<MovieTableHeader user={testMember} cart={testCart} />);
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Rented")).toBeTruthy();
    expect(screen.getByText("Cart: (1)")).toBeTruthy();
  });
});
