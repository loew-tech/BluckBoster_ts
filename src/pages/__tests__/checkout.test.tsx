import { render, screen, waitFor } from "@testing-library/react";

import { CheckoutPage } from "../checkout";
import { renderWithNav } from "../../../test/renderHelpers";
import { testCart, testMember, testMovies } from "../../../test/test-data";
import userEvent from "@testing-library/user-event";

const fetchSpy = jest.spyOn(window, "fetch");

describe("checkout", () => {
  beforeEach(() => {
    fetchSpy.mockImplementation(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => testMovies,
      } as Response;
    });
    localStorage.setItem("user", JSON.stringify(testMember));
  });
  afterEach(() => {
    localStorage.removeItem("user");
  });

  it("should render checkout", async () => {
    renderWithNav(<CheckoutPage />);
    await waitFor(() => {
      expect(screen.getByText(/Checkout/)).toBeTruthy();
    });
  });
  it("should render cart elements", async () => {
    renderWithNav(<CheckoutPage />);
    await waitFor(() => {
      expect(screen.getAllByText(/Remove/)).toHaveLength(2);
    });
  });
  it("should render error message on failed checkout", async () => {
    localStorage.removeItem("user");
    renderWithNav(<CheckoutPage />);
    await userEvent.click(screen.getByText(/Checkout/));
    await waitFor(() => {
      expect(screen.getByText(/Failed/)).toBeTruthy();
    });
  });
});
