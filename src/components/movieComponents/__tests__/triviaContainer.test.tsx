import { render, screen } from "@testing-library/react";

import { TriviaContainer } from "../triviaContainer";

const testTrivia = ":Foo: Bar.&:&:Foo: Bar.&:&:Foo: Bar.";
//   ':What object does Gelsomina constantly carry with her, symbolizing her connection to Zampanò and a source of comfort?: A broken trumpet (or a trumpet with a broken reed).&:&:Besides the titular "La Strada" (The Road), what is the alternative English translation of the film\'s title?: The Street.&:&:What kind of performance art is Zampanò known for?: He is a traveling strongman who breaks a chain wrapped around his chest.';

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
