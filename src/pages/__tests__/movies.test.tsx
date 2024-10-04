import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { MoviesPage } from "../movies";
import { testMovies, testMember, testMovieIDs } from "../../../test/test-data";
import { renderWithNav } from "../../../test/renderHelpers";
import { updateCart } from "../../utils/utils";

const fetchSpy = jest.spyOn(window, "fetch");
jest.mock("../../utils/utils");

// @TODO: look into helpful console warning/err lib
// https://www.npmjs.com/package/jest-fail-on-console

describe("movies page", () => {
  beforeEach(() => {
    console.log("$$ mock0");
    fetchSpy.mockImplementation(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => testMovies,
      } as Response;
    });
    // @TODO: don't like this
    localStorage.setItem("user", JSON.stringify(testMember));
  });

  afterEach(() => {
    localStorage.removeItem("user");
  });

  it("should render children", async () => {
    localStorage.removeItem("user");
    renderWithNav(<MoviesPage />);
    expect(screen.getByText("Movies")).toBeTruthy();
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.queryByText("Add to cart")).toBeFalsy();
    await waitFor(() => {
      expect(screen.getAllByText(/Director/)).toHaveLength(2);
    });
  });
  it("should render full table when user is not null", () => {
    renderWithNav(<MoviesPage />);
    expect(screen.getByText(/captain/)).toBeTruthy();
    expect(screen.getByText(/Cart/)).toBeTruthy();
    expect(screen.getByText("Available")).toBeTruthy();
  });
  it("should update cart when button clicked", async () => {
    (updateCart as jest.Mock).mockImplementationOnce(() => testMovieIDs);
    renderWithNav(<MoviesPage />);

    await waitFor(() => {
      expect(screen.getAllByText("Remove from cart")).toHaveLength(1);
    });
    await userEvent.click(screen.getByText("Add to cart"));
    await waitFor(() => {
      expect(screen.getAllByText("Remove from cart")).toHaveLength(2);
    });
    await waitFor(() => {
      expect(screen.getByText("Cart: (2)")).toBeTruthy();
    });
  });
  // @TODO: why is this test failing. movieErr not getting set to false?
  // it("should render error message when failed to fetch movies", async () => {
  //   fetchSpy.mockImplementationOnce(async () => {
  //     console.log("$$ mock1");
  //     return {
  //       ok: false,
  //       status: 404,
  //       json: async () => jest.fn(),
  //     } as Response;
  //   });
  //   renderWithNav(<MoviesPage />);
  //   expect(screen.getByText("Err fetching movies")).toBeTruthy();
  // });
});
