import "./triviaContainer.css";

type TriviaQ = {
  question: string;
  answer: string;
};

type TriviaComponentProps = {
  trivia: string;
};
export const TriviaContainer = ({ trivia }: TriviaComponentProps) => {
  const triviaQuestions = trivia.split("&:&");
  const trivias = triviaQuestions.map((e: string) => {
    const question = e.split(":");
    return { question: question[1], answer: question[2] };
  });

  return (
    <div>
      {trivias.map((q: TriviaQ, i: number) => {
        return (
          <div key={i}>
            <div className="trivia-container">
              <p className="trivia-question">{q.question}</p>
              <div className="trivia-reveal">
                <span className="question-icon">?</span>
                <span className="trivia-answer">{q.answer}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
