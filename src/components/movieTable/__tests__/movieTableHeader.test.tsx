import { render, screen } from "@testing-library/react";

import { MovieTableHeader } from "../movieTableHeader";
import { testMember } from "../../../../test/test-data";

jest.mock("../../../context/UserContext", () => ({
  useUser: () => ({
    user: testMember,
  }),
}));

describe("MovieTableHeader", () => {
  it("renders default column headers", () => {
    render(<MovieTableHeader />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders user-specific headers when user is provided", () => {
    render(<MovieTableHeader />);
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Rented")).toBeInTheDocument();
  });
});
