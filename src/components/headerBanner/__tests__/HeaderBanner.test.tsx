import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { HeaderBanner } from "../headerBanner";
import { testMember } from "../../../../test/test-data";

// Mock the CartButton component to isolate tests
jest.mock("../CartButton", () => ({
  CartButton: () => <div data-testid="mock-cart-button">Cart Button</div>,
}));

// Mock useUser
// src\context
// src\components\headerBanner\__tests__\HeaderBanner.test.tsx
jest.mock("../../../context/UserContext", () => ({
  useUser: () => ({
    user: testMember,
  }),
}));

describe("HeaderBanner", () => {
  it("renders user info and navigation links when logged in", () => {
    render(
      <MemoryRouter>
        <HeaderBanner />
      </MemoryRouter>
    );

    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();

    expect(screen.getByText(/sea captain/i)).toBeInTheDocument();
    expect(screen.getByText("Currently Rented: 1")).toBeInTheDocument();
    expect(screen.getByTestId("mock-cart-button")).toBeInTheDocument();
  });
});
