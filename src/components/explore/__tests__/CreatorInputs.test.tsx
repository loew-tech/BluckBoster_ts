import { render, screen, fireEvent } from "@testing-library/react";
import { CreatorInputs } from "../CreatorInputs";
import { KEVIN_BACON } from "../../../constants/constants";

describe("CreatorInputs", () => {
  it("renders single input for non-Kevin Bacon mode", () => {
    render(
      <CreatorInputs
        exploreType="DIRECTOR"
        creator="Steven Spielberg"
        setCreator={() => {}}
        movieTitle=""
        setMovieTitle={() => {}}
        director=""
        setDirector={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText("Enter Creator Name")
    ).toBeInTheDocument();
  });

  it("renders all fields for Kevin Bacon mode", () => {
    render(
      <CreatorInputs
        exploreType={KEVIN_BACON}
        creator="Kevin"
        setCreator={() => {}}
        movieTitle="Footloose"
        setMovieTitle={() => {}}
        director="Herbert Ross"
        setDirector={() => {}}
      />
    );
    expect(screen.getByPlaceholderText("Enter Star Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Movie Title")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Director Name")
    ).toBeInTheDocument();
  });

  it("calls setCreator on change", () => {
    const mockSetCreator = jest.fn();
    render(
      <CreatorInputs
        exploreType="DIRECTOR"
        creator=""
        setCreator={mockSetCreator}
        movieTitle=""
        setMovieTitle={() => {}}
        director=""
        setDirector={() => {}}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Enter Creator Name"), {
      target: { value: "Nolan" },
    });
    expect(mockSetCreator).toHaveBeenCalledWith("Nolan");
  });
});
