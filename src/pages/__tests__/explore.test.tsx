/* eslint-disable import/first */

// ✅ Mocks must come before imports
jest.mock("../../context/UserContext", () => ({
  useUser: () => ({
    user: {
      username: "test_user",
      first_name: "Test",
      last_name: "User",
      cart: [],
      checked_out: [],
    },
    setUser: jest.fn(),
    getCart: () => [],
    setCart: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    getCartLength: () => 0,
    isInCart: () => false,
    logout: jest.fn(),
  }),
}));

import { testKevinBaconResponse, testMovies } from "../../../test/test-data";

jest.mock("../../utils/utils", () => ({
  starredWith: jest.fn().mockResolvedValue(["Actor A", "Actor B"]),
  starredIn: jest.fn().mockResolvedValue(testMovies),
  kevinBacon: jest.fn().mockResolvedValue(testKevinBaconResponse),
  directedActors: jest.fn().mockResolvedValue(["Actor A", "Actor B"]),
  directedMovies: jest.fn().mockResolvedValue(testMovies),
}));

// ✅ Imports after mocks
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Explore } from "../explore";
import { renderWithNav } from "../../../test/renderHelpers";
import {
  directedMovies,
  directedActors,
  kevinBacon,
  starredIn,
  starredWith,
} from "../../utils/utils";

describe("Explore", () => {
  it("renders and triggers Kevin Bacon search", async () => {
    renderWithNav(<Explore />);

    // Step 1: Open and select from dropdown
    await userEvent.click(screen.getByText(/Select Search/i));
    await userEvent.click(screen.getByText(/Kevin Bacon/i));

    // Step 2: Type creator name
    await userEvent.type(screen.getByText(/star:/i), "Chris Evans");

    // Step 3: Click Go
    await userEvent.click(screen.getByRole("button", { name: /Go/i }));

    expect(kevinBacon).toHaveBeenCalled();

    // Step 4: Assert results
    await waitFor(() => {
      expect(screen.getByText(/Stars Explored:/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Footloose/i)).toBeInTheDocument();
    expect(screen.getByText(/Herbert Ross/i)).toBeInTheDocument();
  });
  it("renders and triggers Star search", async () => {
    renderWithNav(<Explore />);

    // Step 1: Open dropdown and select "Star"
    await userEvent.click(screen.getByText(/Select Search/i));
    const starOption = await screen.findByText(/Star/i);
    await userEvent.click(starOption);

    // Step 2: Enter creator name
    await userEvent.type(
      screen.getByPlaceholderText(/Enter Creator Name/i),
      "Chris Evans"
    );

    // Step 3: Click Go
    await userEvent.click(screen.getByRole("button", { name: /Go/i }));

    // Step 4: Assert calls
    expect(starredIn).toHaveBeenCalled();
    expect(starredWith).toHaveBeenCalled();

    // Step 5: Wait for and assert UI results
    await waitFor(() => {
      expect(screen.getByText(/Stars/i)).toBeInTheDocument();
    });

    expect(screen.getByText("Actor A")).toBeInTheDocument();
    expect(screen.getByText("Casablanca")).toBeInTheDocument();
  });
  it("renders and triggers Director search", async () => {
    renderWithNav(<Explore />);

    // Step 1: Open dropdown and select "Star"
    await userEvent.click(screen.getByText(/Select Search/i));
    const allDirectorOptions = screen.getAllByText(/director/i);
    await userEvent.click(allDirectorOptions[1]); // or [1] if neede

    // Step 2: Enter creator name
    await userEvent.type(
      screen.getByPlaceholderText(/Enter Creator Name/i),
      "Steven Spielberg"
    );

    // Step 3: Click Go
    await userEvent.click(screen.getByRole("button", { name: /Go/i }));

    // Step 4: Assert calls
    expect(directedActors).toHaveBeenCalled();
    expect(directedMovies).toHaveBeenCalled();

    // Step 5: Wait for and assert UI results
    await waitFor(() => {
      expect(screen.getByText(/Stars/i)).toBeInTheDocument();
    });

    expect(screen.getByText("Actor A")).toBeInTheDocument();
    expect(screen.getByText("Casablanca")).toBeInTheDocument();
  });
});
