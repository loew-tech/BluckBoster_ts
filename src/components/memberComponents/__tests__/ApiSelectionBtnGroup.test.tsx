import { render, screen, fireEvent } from "@testing-library/react";

import { ApiSelectionBtnGroup } from "../ApiSelectionBtnGroup";

jest.mock("../../../utils/cookieUtils", () => ({
  getAPIChoiceFromCookie: () => "REST",
}));

jest.mock("../../../utils/utils", () => ({
  setAPIChoice: jest.fn(),
}));

describe("ApiSelectionBtnGroup", () => {
  it("renders with initial REST selection", () => {
    render(<ApiSelectionBtnGroup />);
    expect(screen.getByText(/currently running on REST/i)).toBeInTheDocument();
  });

  it("switches to GraphQL when clicked", () => {
    render(<ApiSelectionBtnGroup />);
    fireEvent.click(screen.getByText("GraphQL"));
    expect(
      screen.getByText(/currently running on GraphQL/i)
    ).toBeInTheDocument();
  });
});
