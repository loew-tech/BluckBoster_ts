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
    console.log(question);
    return { question: question[1], answer: question[2] };
  });

  return (
    <div>
      {trivias.map((q: TriviaQ) => {
        return (
          <>
            <p>{q.question}</p>
            <p>{q.answer}</p>
          </>
        );
      })}
    </div>
  );
};
