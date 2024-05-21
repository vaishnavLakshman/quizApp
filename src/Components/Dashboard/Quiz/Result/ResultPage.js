import React, { useEffect, useMemo, useState } from "react";
import classes from "./ResultPage.module.css";
import axios from "axios";
import Confetti from "react-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "../../../UI/ProgressBar/ChangingProgressProvider";
import {
  Navigate,
  useAsyncError,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { stringify } from "rc-field-form/es/useWatch";
import IndividualResult from "./IndividualResult";

function ResultPage(props) {
  const [answerKey, setAnswerKey] = useState(
    JSON.parse(localStorage.getItem("correctAnswers"))
  );
  const navigate = useNavigate();
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [userData, setUserData] = useState();
  const category = quiz[0].category;
  const difficulty =
    quiz[0].difficulty.charAt(0).toUpperCase() + quiz[0].difficulty.slice(1);
  const [answerPaper, setAnswerPaper] = useState([]);
  const [confetti, setConfetti] = useState(true);
  const [detailResult, setDetailResult] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [state, setState] = useState({
    index: 0,
    question: "",
    correct: "",
    incorrect: [],
  });
  const [dimensions, setDimensions] = useState({
    height: 650,
    width: 1262,
  });
  let correctAnswers = 0;
  const [index, setIndex] = useState(0);

  const nextButton = useMemo(() => {
    if (index === quiz.length - 1) {
      return true;
    } else {
      return false;
    }
  }, [index]);

  const previousButton = useMemo(() => {
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }, [index]);

  useEffect(() => {
    axios.get("http://localhost:3031/answers").then((res) => {
      console.log("RETURNED DATA :", JSON.stringify(res.data));
      setAnswerPaper(res.data);
    });

    axios.get(`http://localhost:3031/users/` + userId).then((res) => {
      console.log("USER DATA :", JSON.stringify(res.data));
      setUserData(res.data);
    });

    console.log("ANSWERKEY", JSON.stringify(answerKey));
    answerPaper.forEach((answer, i) => {
      if (answerKey[i].answer === answer.answer) {
        console.log("Im Inside If condition");
        correctAnswers++;
      }
    });

    setTotalCorrect(correctAnswers);
    console.log("Correct Count : ", JSON.stringify(correctAnswers));
    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  }, [confetti]);

  const calculateGrade = () => {
    let percent = (totalCorrect / quiz.length) * 100;
    setTimeout(() => {
      setPercentage(parseFloat(percent).toFixed(0));
    }, 1600);
    if (percent <= 100 && percent >= 70) {
      return "A";
    } else if (percent < 70 && percent >= 50) {
      return "B";
    } else if (percent < 50 && percent >= 30) {
      return "C";
    } else {
      return "D";
    }
  };

  const winPercentHandler = () => {
    let wins = (userData.winPercent * userData.totalGames) / 100;
    let percent = (userData.winPercent + percentage) / userData.totalGames + 1;
    let winPercent = 0;
    if (percent <= 100 && percent >= 50) {
      winPercent = ((wins + 1) * 100) / (userData.totalGames + 1);
    } else {
      winPercent = (wins * 100) / (userData.totalGames + 1);
    }
    return parseFloat(winPercent).toFixed(2);
  };

  const totalGradeHandler = () => {
    let percent = (userData.winPercent + percentage) / userData.totalGames + 1;
    if (percent <= 100 && percent >= 70) {
      return "A";
    } else if (percent < 70 && percent >= 50) {
      return "B";
    } else if (percent < 50 && percent >= 30) {
      return "C";
    } else {
      return "D";
    }
  };

  const detailedResultHandler = () => {
    setDetailResult(!detailResult);
    setIndex(0);
    setState({
      index: index,
      question: quiz[index].question,
      correct: quiz[index].correct_answer,
      incorrect: quiz[index].incorrect_answers,
    });
  };

  const wrapUpHandler = () => {
    axios
      .put(`http://localhost:3031/users/` + userId, {
        id: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        email: userData.email,
        username: userData.username,
        totalGames: userData.totalGames + 1,
        winPercent: winPercentHandler(),
        totalGrade: totalGradeHandler(),
        currentGame: {
          questions: quiz.length,
          correctAnswers: totalCorrect,
          category: category,
          difficulty: difficulty,
        },
      })
      .then((res) => {
        console.log("USER DATA :", JSON.stringify(res.data));
      });
    navigate("/user");
  };

  const previousHandler = () => {
    let indexValue = index;
    if (indexValue > 0) {
      console.log("length is more than zero");
      setIndex(indexValue - 1);
    } else {
      console.log("length is less than zero");
      indexValue = 1;
      setIndex(0);
    }
    console.log("INDEX VALUE :", JSON.stringify(index));
    setState({
      index: indexValue - 1,
      question: quiz[indexValue - 1].question,
      correct: quiz[indexValue - 1].correct_answer,
      incorrect: quiz[indexValue - 1].incorrect_answers,
    });
  };

  const nextHandler = () => {
    let indexValue = index;
    if (indexValue < quiz.length - 1) {
      console.log("length is less than top index");
      setIndex(indexValue + 1);
    } else {
      console.log("length is more than top index");
      indexValue = quiz.length - 1;
      setIndex(quiz.length - 1);
    }
    console.log("INDEX VALUE :", JSON.stringify(index));
    setState({
      index: indexValue + 1,
      question: quiz[indexValue + 1].question,
      correct: quiz[indexValue + 1].correct_answer,
      incorrect: quiz[indexValue + 1].incorrect_answers,
    });
  };

  return (
    <div className={classes.container}>
      {confetti && (
        <div className={classes.confettiContainer}>
          <Confetti
            numberOfPieces={200}
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
      )}
      <h1>Results</h1>
      <div className={classes.resultContainer}>
        <div className={classes.eachResult}>
          <div className={classes.info1}>Total Questions</div>
          <div className={classes.info2}>:</div>
          <div className={classes.info3}>{quiz.length}</div>
        </div>
        <div className={classes.eachResult}>
          <div className={classes.info1}>Category</div>
          <div className={classes.info2}>:</div>
          <div className={classes.info3}>{category}</div>
        </div>
        <div className={classes.eachResult}>
          <div className={classes.info1}>Difficulty</div>
          <div className={classes.info2}>:</div>
          <div className={classes.info3}>{difficulty}</div>
        </div>
        <div className={classes.eachResult}>
          <div className={classes.info1}>Correct Answers</div>
          <div className={classes.info2}>:</div>
          <div className={classes.info3}>{totalCorrect}</div>
        </div>
        <div className={classes.gradeResult}>
          <div className={classes.infoGrade1}>Grade</div>
          <div className={classes.infoGrade2}>:</div>
          <div className={classes.infoGrade3}>{calculateGrade()}</div>
        </div>
        <div className={classes.progress}>
          {/* <div className={classes.progressTitle}>Win Progress</div> */}
          <div
            className={classes.progressbar}
            style={{ width: 300, height: 300 }}
          >
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              strokeWidth={20}
              counterClockwise
              styles={buildStyles({
                pathTransitionDuration: 0.5,
                textColor: "#4e8e3c",
                pathColor: "#4e8e3c",
                trailColor: "#6ac351c3",
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
              })}
            />
          </div>
        </div>
      </div>
      {detailResult ? (
        <div className={classes.detailedResult}>
          <button onClick={detailedResultHandler}>Show detailed Results</button>
        </div>
      ) : (
        <div>
          <div className={classes.individualResultContainer}>
            <IndividualResult
              state={state}
              attempted={answerPaper}
              answerKey={answerKey}
            />
            <div className={classes.navigators}>
              <button onClick={previousHandler} disabled={previousButton}>
                &lt;
              </button>
              <button onClick={nextHandler} disabled={nextButton}>
                &gt;
              </button>
            </div>
          </div>
          <div className={classes.detailedResult}>
            <button onClick={detailedResultHandler}>
              Hide detailed Results
            </button>
          </div>
        </div>
      )}
      <div className={classes.redirect} onClick={wrapUpHandler}>
        Go to HomePage
      </div>
    </div>
  );
}

export default ResultPage;
