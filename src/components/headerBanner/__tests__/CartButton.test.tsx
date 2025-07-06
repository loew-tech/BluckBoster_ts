import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// ✅ mock BEFORE importing the component
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../context/UserContext", () => ({
  useUser: () => ({
    getCartLength: () => 3,
  }),
}));

// eslint-disable-next-line import/first
import { CartButton } from "../CartButton"; // AFTER mocks

describe("CartButton", () => {
  it("navigates to checkout on click", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CartButton />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});
