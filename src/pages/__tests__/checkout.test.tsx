/* eslint-disable import/first */
import { testMember, testMovies } from "../../../test/test-data";

// Mocks must come first
const mockSetUser = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../context/UserContext", () => ({
  useUser: () => ({
    user: testMember,
    setUser: mockSetUser,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../utils/utils", () => ({
  fetchCart: jest.fn(),
  updateCart: jest.fn(),
  checkout: jest.fn(),
}));

// Mock subcomponents
jest.mock("../../components/headerBanner/headerBanner", () => ({
  HeaderBanner: () => <div>Mock Header</div>,
}));

jest.mock("../../components/checkoutComponents/CheckoutTable", () => ({
  CheckoutTable: ({ movies, cartRemove }: any) => (
    <>
      <div>Mock Checkout Table</div>
      {movies.map((m: any) => (
        <button key={m.id} onClick={() => cartRemove(m.id)}>
          Remove {m.title}
        </button>
      ))}
    </>
  ),
}));

// Imports AFTER mocks
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutPage } from "../checkout";
import { fetchCart, checkout, updateCart } from "../../utils/utils";
import { REMOVE_FROM_CART } from "../../constants/constants";

describe("CheckoutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders loading spinner while fetching", async () => {
    (fetchCart as jest.Mock).mockResolvedValueOnce([]);
    render(<CheckoutPage />);
    expect(screen.getByText(/loading your cart/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading your cart/i)).not.toBeInTheDocument();
    });
  });
  it("fetches movies and renders checkout table", async () => {
    (fetchCart as jest.Mock).mockResolvedValueOnce(testMovies);
    render(<CheckoutPage />);
    expect(await screen.findByText("Mock Checkout Table")).toBeInTheDocument();
    expect(screen.getByText(/Remove Seven Samurai/i)).toBeInTheDocument();
  });
  it("removes movie from cart when clicked", async () => {
    (fetchCart as jest.Mock).mockResolvedValueOnce([
      { id: "m1", title: "Movie 1" },
      { id: "m2", title: "Movie 2" },
    ]);
    (updateCart as jest.Mock).mockReturnValueOnce([]);
    render(<CheckoutPage />);
    const removeBtn = await screen.findByText("Remove Movie 1");
    await userEvent.click(removeBtn);
    expect(updateCart).toHaveBeenCalledWith(
      testMember.username,
      "m1",
      ["m1", "m2"],
      REMOVE_FROM_CART
    );
    expect(mockSetUser).toHaveBeenCalled(); // User updated with new cart
  });
  it("shows error if checkout fails", async () => {
    (fetchCart as jest.Mock).mockResolvedValueOnce([]);
    (checkout as jest.Mock).mockResolvedValueOnce(false);
    render(<CheckoutPage />);
    await userEvent.click(screen.getByRole("button", { name: /checkout/i }));
    expect(await screen.findByText(/failed to checkout/i)).toBeInTheDocument();
    expect(testMember.cart?.includes("m1")).toBeFalsy();
  });
  it("calls checkout and redirects if successful", async () => {
    (fetchCart as jest.Mock).mockResolvedValueOnce([]);
    (checkout as jest.Mock).mockResolvedValueOnce(true);
    render(<CheckoutPage />);
    await userEvent.click(screen.getByRole("button", { name: /checkout/i }));
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalled();
    });
    expect(mockNavigate).toHaveBeenCalledWith("/movies");
  });
});
