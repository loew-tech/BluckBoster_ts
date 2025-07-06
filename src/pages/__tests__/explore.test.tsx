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
  kevinBacon: jest.fn().mockResolvedValue({
    testKevinBaconResponse,
  }),
}));

// ✅ Imports after mocks
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Explore } from "../explore";
import { renderWithNav } from "../../../test/renderHelpers";
import { kevinBacon } from "../../utils/utils";

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
    // @TODO: fix this
    // // Step 4: Assert results
    // await waitFor(() => {
    //   expect(screen.getByText(/stars:/i)).toBeInTheDocument();
    // });
    // expect(screen.getByText("Movies")).toBeInTheDocument();
    // expect(screen.getByText("Directors")).toBeInTheDocument();

    // expect(screen.getByText("Actor A")).toBeInTheDocument();
    // expect(screen.getByText("Movie 1")).toBeInTheDocument();
    // expect(screen.getByText("Director A")).toBeInTheDocument();
  });
});
