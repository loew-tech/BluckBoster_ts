import { render, screen } from "@testing-library/react";

import { TriviaContainer } from "../triviaContainer";

const testTrivia = ":Foo: Bar.&:&:Foo: Bar.&:&:Foo: Bar.";

describe("triviaContainer", () => {
  it("should render trivia questions on load", () => {
    render(<TriviaContainer trivia={testTrivia} />);
    expect(screen.getAllByText(/Foo/)).toHaveLength(3);
  });
  it("should render trivia answers on load", () => {
    render(<TriviaContainer trivia={testTrivia} />);
    expect(screen.getAllByText(/Bar/)).toHaveLength(3);
  });
});
