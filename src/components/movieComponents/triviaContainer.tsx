import "./triviaContainer.css";

type TriviaQ = {
  question: string;
  answer: string;
};

type TriviaComponentProps = {
  trivia: string;
};
export const TriviaContainer = ({ trivia }: TriviaComponentProps) => {
  // @TODO: some trivia is formatted wrong -> (ex: ikiru_1952 -> ":    Question:....")
  // @TODO: need to clean db

  const triviaQuestions = trivia.split("&:&");
  const trivias = triviaQuestions.map((e: string) => {
    const question = e.split(":");
    return question[1].trim() === "Question"
      ? { question: question[2], answer: question[3] }
      : { question: question[1], answer: question[2] };
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
