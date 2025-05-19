import { Icon, Reveal, RevealContent } from "semantic-ui-react";

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
    console.log(question);
    return { question: question[1], answer: question[2] };
  });

  // return (
  //   <div>
  //     {trivias.map((q: TriviaQ, i: number) => {
  //       return (
  //         <div key={i}>
  //           <p>{q.question}</p>
  //           <div>
  //             {/* @TODO: have reveal overlap siblings */}
  //             <p style={{ fontWeight: "normal" }}>{q.answer}</p>
  //             <Reveal
  //               animated="move up"
  //               style={{ position: "absolute !important", top: 0, zIndex: 1 }}
  //             >
  //               <RevealContent visible>
  //                 <Icon
  //                   name="question circle"
  //                   size="massive"
  //                   bordered
  //                   style={{ content: "center", backgroundColor: "white" }}
  //                 />
  //               </RevealContent>
  //               {/* <RevealContent hidden>
  //                 <p style={{ fontWeight: "normal" }}>{q.answer}</p>
  //               </RevealContent> */}
  //             </Reveal>
  //           </div>
  //         </div>
  //       );

  return (
    <div>
      {trivias.map((q: TriviaQ, i: number) => {
        return (
          <div key={i}>
            <p>{q.question}</p>
            <Reveal animated="move">
              <RevealContent visible>
                <Icon
                  name="question circle"
                  size="massive"
                  bordered
                  style={{ content: "center", backgroundColor: "white" }}
                />
              </RevealContent>
              <RevealContent hidden>
                <p style={{ fontWeight: "normal" }}>{q.answer}</p>
              </RevealContent>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
};
