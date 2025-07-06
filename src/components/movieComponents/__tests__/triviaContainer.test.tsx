import { render, screen } from "@testing-library/react";

import { TriviaContainer } from "../triviaContainer";

describe("TriviaContainer", () => {
  const testTrivia = ":Foo: Bar.&:&:Foo: Bar.&:&:Foo: Bar.";
  const testTrivia2 = ":  Question:Foo: Bar.&:&:Foo: Bar.&:&:Foo: Bar.";

  it("renders all questions and answers", () => {
    render(<TriviaContainer trivia={testTrivia} />);

    // 3 questions (prefix ":Foo")
    const questions = screen.getAllByText("Foo");
    expect(questions).toHaveLength(3);

    // 3 answers wrapped in .trivia-reveal (data-testid="trivia-reveal")
    const answers = screen.getAllByTestId("trivia-reveal");
    expect(answers).toHaveLength(3);
    answers.forEach((answer) => {
      expect(answer).toHaveTextContent("Bar");
    });
  });

  it("renders all questions and answers with alternate trivia format", () => {
    render(<TriviaContainer trivia={testTrivia2} />);

    // 3 questions (prefix ":Foo")
    const questions = screen.getAllByText("Foo");
    expect(questions).toHaveLength(3);

    // 3 answers wrapped in .trivia-reveal (data-testid="trivia-reveal")
    const answers = screen.getAllByTestId("trivia-reveal");
    expect(answers).toHaveLength(3);
    answers.forEach((answer) => {
      expect(answer).toHaveTextContent("Bar");
    });
  });

  it("does not render anything if trivia is missing", () => {
    const { container } = render(<TriviaContainer trivia="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
