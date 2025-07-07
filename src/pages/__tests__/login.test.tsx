/* eslint-disable import/first */
import { testMember } from "../../../test/test-data";

// ✅ Mock useUser BEFORE import
const mockSetUser = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../context/UserContext", () => ({
  useUser: () => ({
    user: null,
    setUser: mockSetUser,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../utils/cookieUtils", () => ({
  hasCookieConsent: jest.fn(() => true),
  deleteCookie: jest.fn(),
}));

jest.mock("../../utils/utils", () => ({
  login: jest.fn(async (username: string) =>
    username === testMember.username ? testMember : null
  ),
}));

// ✅ Imports after mocks
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithNav } from "../../../test/renderHelpers";
import { LoginPage } from "../login";
import { hasCookieConsent } from "../../utils/cookieUtils";
import { moviesPath } from "../../constants/constants";

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form and buttons", () => {
    renderWithNav(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view our movies/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /explore kevin bacon/i })
    ).toBeInTheDocument();
  });

  it("shows error if cookie consent is missing", async () => {
    (hasCookieConsent as jest.Mock).mockReturnValueOnce(false);
    renderWithNav(<LoginPage />);
    await userEvent.type(screen.getByLabelText(/username/i), "anyone");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await screen.findByText(/cannot login without accepting cookie/i);

    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it("shows error on failed login", async () => {
    renderWithNav(<LoginPage />);
    await userEvent.type(screen.getByLabelText(/username/i), "invalidUser");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await screen.findByText(/failed to login with username invalidUser/i);

    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it("navigates on successful login", async () => {
    renderWithNav(<LoginPage />);
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    await userEvent.type(
      screen.getByLabelText(/username/i),
      testMember.username
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockSetUser).toHaveBeenCalledTimes(2);
    expect(mockSetUser).toHaveBeenCalledWith(testMember);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(moviesPath);
    });
  });
});
