import { Fade } from "react-awesome-reveal";

import "./triviaContainer.css";
import { useState } from "react";

type TriviaQ = {
  question: string;
  answer: string;
};

type TriviaComponentProps = {
  trivia: string;
};
export const TriviaContainer = ({ trivia }: TriviaComponentProps) => {
  const [revealAnswers, setRevealAnswers] = useState<boolean[]>(
    Array<boolean>(trivia.split("&:&").length).fill(false)
  );

  const triviaQuestions = trivia.split("&:&");
  const trivias = triviaQuestions.map((e: string) => {
    const question = e.split(":");
    return { question: question[1], answer: question[2] };
  });

  const setRevealAnswerTrue = (index: number) => {
    console.log("1", index, revealAnswers);
    const newBooleanArray = [...revealAnswers];
    newBooleanArray[index] = true;
    setRevealAnswers(newBooleanArray);
    console.log("2", revealAnswers);
  };

  return (
    <div>
      {trivias.map((q: TriviaQ, i: number) => {
        return (
          <div key={i}>
            <p>{q.question}</p>
            {revealAnswers[i] ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Fade direction="left" triggerOnce={true}>
                  <div style={{ height: "100%" }}>
                    {/* Content to be revealed */}
                    <p style={{ fontWeight: "normal" }}>{q.answer}</p>
                  </div>
                </Fade>
              </div>
            ) : (
              <p onClick={() => setRevealAnswerTrue(i)}>
                click to Reveal Answer
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
