import { render, screen } from "@testing-library/react";
import { SearchSelector } from "../SearchSelector";
import { KEVIN_BACON } from "../../../constants/constants";

describe("SearchSelector", () => {
  const mockSetExploreType = jest.fn();
  const mockSetDepth = jest.fn();

  beforeEach(() => {
    mockSetExploreType.mockClear();
    mockSetDepth.mockClear();
  });

  it("renders dropdowns", () => {
    render(
      <SearchSelector
        exploreType="DIRECTOR"
        setExploreType={mockSetExploreType}
        depth={3}
        setDepth={mockSetDepth}
      />
    );
    expect(screen.getByText("Select Search")).toBeInTheDocument();
  });

  it("renders depth dropdown if KEVIN_BACON is selected", () => {
    render(
      <SearchSelector
        exploreType={KEVIN_BACON}
        setExploreType={mockSetExploreType}
        depth={3}
        setDepth={mockSetDepth}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
