import { render, screen } from "@testing-library/react";

import { MovieElementRow } from "../movieElementRow";

describe("movieElementRow", () => {
  it("should render sectionTitle", () => {
    render(<MovieElementRow sectionTitle="Foo" content={null} />);
    expect(screen.getByText(/Foo/)).toBeTruthy();
  });
  it("should render content", () => {
    render(<MovieElementRow sectionTitle="Foo" content={<p>content</p>} />);
    expect(screen.getByText(/content/)).toBeTruthy();
  });
});
