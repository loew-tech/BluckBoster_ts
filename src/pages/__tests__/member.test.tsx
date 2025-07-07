/* eslint-disable import/first */

// ⬛ Mock useUser and its context
const mockSetUser = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../context/UserContext", () => ({
  useUser: () => ({
    setUser: mockSetUser,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../utils/cookieUtils", () => ({
  deleteCookie: jest.fn(),
}));

// ⬛ Mock components you don’t want to fully render
jest.mock("../../components/headerBanner/headerBanner", () => ({
  HeaderBanner: () => <div>Mock Header</div>,
}));

jest.mock("../../components/memberComponents/ApiSelectionBtnGroup", () => ({
  ApiSelectionBtnGroup: () => <div>Mock API Selector</div>,
}));

jest.mock("../../components/memberComponents/RentalTable", () => ({
  RentalTable: ({ setIsLoading }: any) => {
    // Trigger loading spinner manually for test
    setIsLoading(true);
    return <div>Mock Rental Table</div>;
  },
}));

// ✅ Imports AFTER mocks
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemberPage } from "../member";
import { deleteCookie } from "../../utils/cookieUtils";

describe("MemberPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all expected components", () => {
    render(<MemberPage />);
    expect(screen.getByText(/Mock Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock API Selector/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Rental Table/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls logout logic when button clicked", async () => {
    render(<MemberPage />);
    await userEvent.click(screen.getByRole("button", { name: /logout/i }));

    expect(deleteCookie).toHaveBeenCalledWith("user");
    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows loading spinner when isLoading is true", () => {
    render(<MemberPage />);
    expect(screen.getByText(/loading your profile/i)).toBeInTheDocument();
  });
});
