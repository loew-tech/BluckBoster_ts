import { render, screen, fireEvent } from "@testing-library/react";
import { CookieConsent } from "../CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear(); // reset before each test
  });

  it("shows the banner when no consent is given", () => {
    render(<CookieConsent />);
    expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
  });

  it("hides the banner after clicking accept", () => {
    render(<CookieConsent />);
    const button = screen.getByRole("button", { name: /accept/i });
    fireEvent.click(button);
    expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie_consent")).toBe("true");
  });

  it("does not show the banner if consent already exists", () => {
    localStorage.setItem("cookie_consent", "true");
    render(<CookieConsent />);
    expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
  });
});
