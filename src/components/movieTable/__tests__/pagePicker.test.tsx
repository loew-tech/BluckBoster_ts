import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";

import { PagePicker } from "../pagePicker";
import userEvent from "@testing-library/user-event";

const updateMoviesSpy = jest.fn();

describe("pagePicker", () => {
  it("should render", () => {
    render(<PagePicker updateMovies={updateMoviesSpy} />);
    expect(screen.getByText("#123?!")).toBeTruthy();
    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("Z")).toBeTruthy();
  });
  it("should update movies when new page is selected", async () => {
    render(<PagePicker updateMovies={updateMoviesSpy} />);
    await userEvent.click(screen.getByText("W"));
    expect(updateMoviesSpy).toBeCalled();
  });
  it("should not update movies when current page is selected", async () => {
    render(<PagePicker updateMovies={updateMoviesSpy} />);
    await userEvent.click(screen.getByText("A"));
    expect(updateMoviesSpy).toBeCalledTimes(0);
  });
});
