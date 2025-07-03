import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

import { MoviesPage } from "../movies";
import { testMovies, testMember, testMovieIDs } from "../../../test/test-data";
import { renderWithNav } from "../../../test/renderHelpers";
import { updateCart } from "../../utils/utils";
import { deleteCookie, setCookie } from "../../utils/cookieUtils";

const fetchSpy = jest.spyOn(window, "fetch");
jest.mock("../../utils/utils");

describe("movies page", () => {
  beforeEach(() => {
    fetchSpy.mockImplementation(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => testMovies,
      } as Response;
    });
    // @TODO: don't like this
    setCookie("user", JSON.stringify(testMember));
  });

  afterEach(() => {
    deleteCookie("user");
  });

  it("should render children", async () => {
    deleteCookie("user");
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
  it("should render error message when failed to fetch movies", async () => {
    fetchSpy.mockImplementationOnce(async () => {
      return {
        ok: false,
        status: 404,
        json: async () => jest.fn(),
      } as Response;
    });
    renderWithNav(<MoviesPage />);
    await waitFor(() => {
      expect(screen.getByText(/Whoops/)).toBeTruthy();
    });
  });
});
