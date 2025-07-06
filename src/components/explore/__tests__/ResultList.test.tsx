import { render, screen } from "@testing-library/react";
import { ResultList } from "../ResultList";

describe("ResultList", () => {
  it("renders list with plain strings", () => {
    render(<ResultList title="Stars" items={["Kevin", "Tom"]} />);
    expect(screen.getByText("Kevin")).toBeInTheDocument();
    expect(screen.getByText("Tom")).toBeInTheDocument();
  });

  it("renders links with labels", () => {
    const items = [{ label: "IMDB", link: "https://imdb.com" }];
    render(<ResultList title="Links" items={items} />);
    const link = screen.getByRole("link", { name: /IMDB/i });
    expect(link).toHaveAttribute("href", "https://imdb.com");
  });
});
