import { screen, waitFor } from "@testing-library/react";
import { renderWithNav } from "../../../test/renderHelpers";
import { LoginPage } from "../login";
import userEvent from "@testing-library/user-event";

const fetchSpy = jest.spyOn(window, "fetch");

describe("login", () => {
  it("should render login field and buttons", () => {
    renderWithNav(<LoginPage />);
    expect(screen.getByText("username")).toBeTruthy();
    expect(screen.getByText("EXPLORE OUR MOVIES!")).toBeTruthy();
    expect(screen.getByText(/Login/)).toBeTruthy();
  });
  it("should render error message on failed login", async () => {
    fetchSpy.mockImplementation(async () => {
      return {
        ok: false,
        status: 400,
        json: async () => null,
      } as Response;
    });
    renderWithNav(<LoginPage />);
    await userEvent.click(screen.getByText(/Login/));
    await waitFor(() => {
      expect(screen.getByText(/failed/)).toBeTruthy();
    });
  });
});
