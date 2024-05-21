import React, { useEffect, useState } from "react";
import classes from "./IndividualResult.module.css";
import correct from "../../../../images/right.png";
import wrong from "../../../../images/wrong.png";
let keyAnswers = [];
let attemptAnswers = [];

function IndividualResult(props) {
  const quizData = props.state;
  const index = props.state.index + 1;
  const question = props.state.question;
  const correctAnswer = props.state.correct;
  const incorrectAnswer = props.state.incorrect;
  const attempts = props.attempted;
  const answerKey = props.answerKey;
  const [options, setOptions] = useState([]);
  const answers = [];
  answers.push(incorrectAnswer[0]);
  answers.push(incorrectAnswer[1]);
  answers.push(incorrectAnswer[2]);
  answers.push(correctAnswer);

  useEffect(() => {
    const shuffled = [...answers].sort(() => 0.5 - Math.random());
    setOptions(shuffled);

    attempts.map((i) => {
      attemptAnswers.push(i.answer);
    });
    console.log("ATEMPTS", JSON.stringify(attempts));

    answerKey.map((k) => {
      keyAnswers.push(k.answer);
    });
    console.log("Answers :", JSON.stringify(answerKey));
  }, [props]);

  const optionsHandler = (e) => {
    if (attemptAnswers.indexOf(e) !== -1) {
      if (keyAnswers.indexOf(e) !== -1) {
        for (let i = 0; i < attemptAnswers.length; i++) {
          if (attempts[i].answer === e && answerKey[i].answer === e) {
            return (
              <div className={classes.answer}>
                <h3 dangerouslySetInnerHTML={{ __html: e }} />
                <img src={correct} />
              </div>
            );
          } else {
            <div className={classes.answer}>
              <h3 dangerouslySetInnerHTML={{ __html: e }} />
            </div>;
          }
        }
      } else {
        return (
          <div className={classes.answer}>
            <h3 dangerouslySetInnerHTML={{ __html: e }} />
            <img src={wrong} />
          </div>
        );
      }
    } else {
      if (keyAnswers.indexOf(e) !== -1) {
        return (
          <div className={classes.answer}>
            <h3 dangerouslySetInnerHTML={{ __html: e }} />
            <img src={correct} />
          </div>
        );
      } else {
        return (
          <div className={classes.answer}>
            <h3 dangerouslySetInnerHTML={{ __html: e }} />
          </div>
        );
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.questionContainer}>
        <h2>{index}.&nbsp;&nbsp;&nbsp;</h2>
        <h2 dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className={classes.optionsContainer}>
        <div className={classes.option}>{optionsHandler(options[0])}</div>
        <div className={classes.option}>{optionsHandler(options[1])}</div>
        <div className={classes.option}>{optionsHandler(options[2])}</div>
        <div className={classes.option}>{optionsHandler(options[3])}</div>
      </div>
    </div>
  );
}

export default IndividualResult;
