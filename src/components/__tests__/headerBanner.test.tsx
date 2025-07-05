import { render, screen } from "@testing-library/react";

import { HeaderBanner } from "../headerBanner/headerBanner";
import { testMember } from "../../../test/test-data";

describe("header bannder", () => {
  it("should render when user is null", () => {
    render(<HeaderBanner user={null} />);
    expect(screen.getByText("Movies")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
    expect(screen.queryByText("Sign Out")).toBeFalsy();
    expect(screen.queryByText("Currently")).toBeFalsy();
  });
  it("should render when user is not null", () => {
    render(<HeaderBanner user={testMember} />);
    expect(screen.getByText("Movies")).toBeTruthy();
    expect(screen.queryByText("Login")).toBeFalsy();
    expect(screen.getByText("Sign Out")).toBeTruthy();
    expect(screen.getByText(/Currently/)).toBeTruthy();
  });
});
