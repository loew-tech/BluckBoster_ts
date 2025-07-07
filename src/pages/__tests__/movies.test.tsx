/* eslint-disable import/first */

// Mocks come first
const mockSetUser = jest.fn();

jest.mock("../../context/UserContext", () => ({
  useUser: () => ({
    user: {
      username: "test_user",
      cart: [],
      checked_out: ["m1", "m2"],
    },
    setUser: mockSetUser,
  }),
}));

jest.mock("../../utils/utils", () => ({
  fetchMovies: jest.fn(),
  returnRentals: jest.fn(),
}));

// Stub child components to simplify output
jest.mock("../../components/headerBanner/headerBanner", () => ({
  HeaderBanner: () => <div>Mock Header</div>,
}));

jest.mock("../../components/movieTable/movieTable", () => ({
  MovieTable: ({ movies, returnRental }: any) => (
    <div>
      Mock Movie Table
      {movies.map((m: any) => (
        <button key={m.id} onClick={() => returnRental(m.id)}>
          Return {m.title}
        </button>
      ))}
    </div>
  ),
}));

jest.mock("../../components/common/Spinner", () => ({
  Spinner: ({ message }: any) => <div>{message}</div>,
}));

jest.mock("../../components/common/ErrorMessage", () => ({
  ErrorMessage: ({ msg }: any) => <div>{msg}</div>,
}));

// Imports
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MoviesPage } from "../movies";
import { fetchMovies, returnRentals } from "../../utils/utils";

describe("MoviesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows spinner on load", async () => {
    (fetchMovies as jest.Mock).mockResolvedValue([]);
    render(<MoviesPage />);
    expect(screen.getByText(/loading our VHS library/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });

  it("renders movies table after successful fetch", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce([
      { id: "m1", title: "B Movie" },
      { id: "m2", title: "A Movie" },
    ]);
    render(<MoviesPage />);
    expect(await screen.findByText("Mock Movie Table")).toBeInTheDocument();
    expect(screen.getByText("Return A Movie")).toBeInTheDocument();
    expect(screen.getByText("Return B Movie")).toBeInTheDocument();
  });

  it("renders error message if fetch fails", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce(null);
    render(<MoviesPage />);
    expect(
      await screen.findByText(/unexpected error occurred/i)
    ).toBeInTheDocument();
  });

  it("calls returnRental and updates user", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce([
      { id: "m1", title: "Movie One" },
    ]);
    (returnRentals as jest.Mock).mockResolvedValueOnce(true);

    render(<MoviesPage />);
    const returnBtn = await screen.findByText("Return Movie One");

    await userEvent.click(returnBtn);

    expect(returnRentals).toHaveBeenCalledWith("test_user", ["m1"]);
    expect(mockSetUser).toHaveBeenCalledWith({
      username: "test_user",
      cart: [],
      checked_out: ["m2"],
    });
  });

  it("does not update user if return fails", async () => {
    (fetchMovies as jest.Mock).mockResolvedValueOnce([
      { id: "m1", title: "Fail Movie" },
    ]);
    (returnRentals as jest.Mock).mockResolvedValueOnce(false);

    render(<MoviesPage />);
    const returnBtn = await screen.findByText("Return Fail Movie");

    await userEvent.click(returnBtn);

    expect(mockSetUser).not.toHaveBeenCalled();
  });
});
