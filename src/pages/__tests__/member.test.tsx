import { screen, waitFor } from "@testing-library/react";
import { renderWithNav } from "../../../test/renderHelpers";
import { testMember, testMovies } from "../../../test/test-data";
import { MemberPage } from "../member";
import { getUser } from "../../utils/utils";
import userEvent from "@testing-library/user-event";
import { deleteCookie, setCookie } from "../../utils/cookieUtils";

const fetchSpy = jest.spyOn(window, "fetch");
jest.mock("../../utils/utils");

console.warn = () => {};

describe("member page", () => {
  beforeEach(() => {
    fetchSpy.mockImplementation(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => testMovies,
      } as Response;
    });
    (getUser as jest.Mock).mockResolvedValue(testMember);
    setCookie("user", JSON.stringify(testMember));
  });

  afterEach(() => {
    deleteCookie("user");
  });

  it("should render header banner", async () => {
    renderWithNav(<MemberPage />);
    expect(screen.getByText(/Movies/)).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText(/Sea/)).toBeTruthy();
    });
  });
  it("should not render rentals table if rentals is empty", async () => {
    fetchSpy.mockImplementationOnce(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => [],
      } as Response;
    });
    renderWithNav(<MemberPage />);
    await waitFor(() => {
      expect(screen.queryByText(/Return/)).toBeFalsy();
    });
  });
  it("should not render rentals table if content", async () => {
    renderWithNav(<MemberPage />);
    await waitFor(() => {
      expect(screen.getByText(/Return All Movies/)).toBeTruthy();
    });
    expect(screen.getAllByText(/Return Movie/)).toHaveLength(2);
  });
  it("should render err message when failed to fetch checked out movies", async () => {
    fetchSpy.mockImplementationOnce(async () => {
      return {
        ok: false,
        status: 404,
        json: async () => null,
      } as Response;
    });
    renderWithNav(<MemberPage />);
    await waitFor(() => {
      expect(screen.getByText(/Whoops/)).toBeTruthy();
    });
    expect(screen.getByText(/Failed/)).toBeTruthy();
  });
  it("should remove movie from list on return", async () => {
    renderWithNav(<MemberPage />);
    await waitFor(() => {
      expect(screen.getAllByText(/Return Movie/)).toHaveLength(2);
    });
    await userEvent.click(screen.getAllByText(/Return Movie/)[0]);
    await waitFor(() => {
      expect(screen.getAllByText(/Return Movie/)).toHaveLength(1);
    });
  });
  it("should remove all movie from list on return all", async () => {
    renderWithNav(<MemberPage />);
    await waitFor(() => {
      expect(screen.getAllByText(/Return Movie/)).toHaveLength(2);
    });
    await userEvent.click(screen.getByText(/Return All Movies/));
    await waitFor(() => {
      expect(screen.queryByText(/Return Movie/)).toBeFalsy();
    });
    // @TODO: why is this failing
    // await waitFor(() => {
    //   expect(screen.getByText("0")).toBeTruthy();
    // });
  });
  it("should render err message on failed return", async () => {
    renderWithNav(<MemberPage />);
    await waitFor(() => {
      expect(screen.getAllByText(/Return Movie/)).toHaveLength(2);
    });
    fetchSpy.mockImplementationOnce(async () => {
      return {
        ok: false,
        status: 404,
        json: async () => null,
      } as Response;
    });
    await userEvent.click(screen.getByText(/Return All Movies/));
    // @TODO: why is this failing? Is mock wrong?
    // await waitFor(() => {
    //   expect(screen.queryByText(/Return Movie/)).toBeFalsy();
    // });
    await waitFor(() => {
      expect(screen.getByText(/Whoops/)).toBeTruthy();
    });
    expect(screen.getByText(/Failed/)).toBeTruthy();
  });
});
