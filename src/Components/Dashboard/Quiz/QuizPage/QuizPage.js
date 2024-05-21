import React, { useCallback, useEffect, useState } from "react";
import classes from "./QuizPage.module.css";
import "./Question.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Stopwatch from "../StopWatch/Stopwatch";
import { message } from "antd";

function QuizPage(props) {
  const quiz = useLocation().state;
  console.log("USELOCATION", JSON.stringify(quiz));
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const [open, setOpen] = useState(true);
  const [run, setRun] = useState(false);
  const [options, setOptions] = useState([]);
  const [checkState, setCheckState] = useState({
    check0: false,
    check1: false,
    check2: false,
    check3: false,
  });
  const [answerState, setAnswerState] = useState({
    index: index,
    answer: "",
  });
  const answers = [];
  answers.push(quiz[index].incorrect_answers[0]);
  answers.push(quiz[index].incorrect_answers[1]);
  answers.push(quiz[index].incorrect_answers[2]);
  answers.push(quiz[index].correct_answer);

  const handleClose = () => {
    setOpen(false);
    setRun(true);
  };

  useEffect(() => {
    setupCorrectAnswers();
    quiz.map((index) => {
      setCategory(index.category);
    });

    if (index === quiz.length - 1) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }

    const shuffled = [...answers].sort(() => 0.5 - Math.random());
    setOptions(shuffled);
  }, [index]);

  const setupCorrectAnswers = useCallback(() => {
    for (let i = 0; i < quiz.length; i++) {
      setCorrectAnswers((ques) => [
        ...ques,
        { index: i + 1, answer: quiz[i].correct_answer },
      ]);
    }
    localStorage.setItem("correctAnswers", JSON.stringify(correctAnswers));
  }, [open]);

  const handleRadio = (e) => {
    setAnswerState({
      index: index + 1,
      answer: e.target.value,
    });
  };

  const handleNext = () => {
    if (
      checkState.check0 ||
      checkState.check1 ||
      checkState.check2 ||
      checkState.check3
    ) {
      if (index < quiz.length) {
        setIndex(index + 1);
      } else {
        setIndex(index);
      }
      axios.post("http://localhost:3031/answers", answerState).then((res) => {
        console.log("RESPONSE : " + JSON.stringify(res.data));
      });
      setCheckState({
        check0: false,
        check1: false,
        check2: false,
        check3: false,
      });
    } else {
      message.warning("Please choose an option!");
    }
  };

  const resultHandler = () => {
    if (
      checkState.check0 ||
      checkState.check1 ||
      checkState.check2 ||
      checkState.check3
    ) {
      axios.post("http://localhost:3031/answers", answerState).then((res) => {
        console.log("RESPONSE : " + JSON.stringify(res.data));
      });
      setRun(false);
      // navigate("/");
    } else {
      message.warning("Please choose an option!");
    }
    navigate("/result");
  };

  return (
    <div className={classes.container}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Here We Go!"}</DialogTitle>
        <DialogActions>
          <button onClick={handleClose}>OK</button>
        </DialogActions>
      </Dialog>
      <div className={classes.headerContainer}>
        <div className={classes.category}>
          <b>Category :</b> {category}
        </div>
        {console.log("Correct Answers :" + JSON.stringify(correctAnswers))}
        <div className={classes.timer}>
          <b>Time : </b>
          <Stopwatch run={run} />
        </div>
      </div>
      <div className={classes.questionContainer}>
        {/* <Question state={handleState} /> */}
        {/* <div className={classes.container}> */}
        <div className="question">
          <h3>{index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;</h3>

          <h3 dangerouslySetInnerHTML={{ __html: quiz[index].question }} />
        </div>
        <div className="options">
          <form>
            <div className="option">
              <input
                type="radio"
                name="options"
                value={options[0]}
                checked={checkState.check0}
                onChange={(e) => {
                  handleRadio(e);
                  setCheckState({
                    check0: true,
                  });
                }}
              />
              <label dangerouslySetInnerHTML={{ __html: options[0] }} />
            </div>
            <div className="option">
              <input
                type="radio"
                name="options"
                value={options[1]}
                checked={checkState.check1}
                onChange={(e) => {
                  handleRadio(e);
                  setCheckState({
                    check1: true,
                  });
                }}
              />
              <label dangerouslySetInnerHTML={{ __html: options[1] }} />
            </div>
            <div className="option">
              <input
                type="radio"
                name="options"
                value={options[2]}
                checked={checkState.check2}
                onChange={(e) => {
                  handleRadio(e);
                  setCheckState({
                    check2: true,
                  });
                }}
              />
              <label dangerouslySetInnerHTML={{ __html: options[2] }} />
            </div>
            <div className="option">
              <input
                type="radio"
                name="options"
                value={options[3]}
                checked={checkState.check3}
                onChange={(e) => {
                  handleRadio(e);
                  setCheckState({
                    check3: true,
                  });
                }}
              />
              <label dangerouslySetInnerHTML={{ __html: options[3] }} />
            </div>
          </form>
        </div>
      </div>
      {!buttonState ? (
        <div className={classes.change}>
          <div className={classes.changeButton2} onClick={handleNext}>
            Next
          </div>
        </div>
      ) : (
        <div className={classes.change}>
          <div className={classes.changeButton2} onClick={resultHandler}>
            Submit
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
